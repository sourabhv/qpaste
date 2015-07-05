var config = require('./config');
var Snippet = require('./snippet');

var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'jade');

app.get(/^\/([a-zA-Z]*)\/?$/, function (req, res) {
    res.render('index');
});

app.get(/^\/([0-9]+)\/?$/, function (req, res) {
    var id = req.params['0'];
    Snippet.where({ id: id }).fetch()
        .then(function (data) {
            res.render('index', {
                'content': data.attributes.content,
                'lexer': data.attributes.lexer
            });
        })
});

app.post(/^\/([a-zA-Z]*)\/?$/, function (req, res) {
    var content = req.body.code;
    var lexer = req.params['0'];
    new Snippet({
        content: content,
        lexer: lexer
    }).save().then(function (data) {
            if (data !== null)
                res.status(200).json({ success: true, id: data.id });
            else
                res.status(200).json({ success: false });
        }).error(function (error) {
            res.status(503).json({ success: false, message: 'Something went wrong' });
        });
});

app.get('*', function (req, res) {
    res.redirect('/');
});

app.listen(config.port);
console.log('App running on port', config.port);

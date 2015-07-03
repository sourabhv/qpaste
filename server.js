var config = require('./config')

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
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');

app.get('/:ext?', function (req, res) {
    var ext = req.params.ext || 'Plain Text';
    console.log('ext:', ext);
    res.render('index', { ext: ext });
});

app.get('*', function (req, res) {
    res.redirect('/');
});

app.listen(config.port);
console.log('App running on port', config.port);

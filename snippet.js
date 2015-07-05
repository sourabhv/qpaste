var config = require('./config');

var pg = require('pg');
var knex = require('knex')({
    client: 'pg',
    connection: config.postgres,
});
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf.Model.extend({
    tableName: 'snippets'
}, {
    raw: function (q) {
        return bookshelf.knex.raw(q);
    },
});

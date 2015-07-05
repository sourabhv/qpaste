try { require('./env.js'); } catch (e) { }

module.exports = {
    name: 'QPaste',
    port: process.env.PORT || 8080,
    postgres: ((function () {
        return process.env.DEV ?
               'postgres://sourabh:terminator@localhost/qpaste' :
               process.env.DATABASE_URL;
    }) ()),
};

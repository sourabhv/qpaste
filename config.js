try { require('./env.js'); } catch (e) { }

module.exports = {
    name: 'Snippt.me',
    port: process.env.PORT || 8080,
    postgres: ((function () {
        return process.env.DEV ?
               'postgres://sourabh:terminator@localhost/snippt' :
               process.env.DATABASE_URL;
    }) ()),
};

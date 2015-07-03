try { require('./env.js'); } catch (e) { }

module.exports = {
    name: 'QPaste',
    port: process.env.PORT || 8080
};

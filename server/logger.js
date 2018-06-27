const consola = require('consola')

consola.start('Logger booted');

const types = ['error', 'success']

const logger = {};

types.forEach(type => logger[type] = (message) => consola[type](message));

module.exports = logger;
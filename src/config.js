/* jshint node:true */

'use strict';

var convict = require('convict');

var conf = convict({
	env: {
		doc: 'The applicaton environment.',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV',
		arg: 'node-env'
	},
	host: {
		doc: 'The host to bind.',
		default: '127.0.0.1',
		env: 'HOST',
		arg: 'host'
	},
	port: {
		doc: 'The port to bind.',
		format: 'port',
		default: 3000,
		env: 'PORT',
		arg: 'port'
	}
});

conf.validate();

module.exports = conf;
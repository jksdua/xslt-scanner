var fs = require('fs');

// define global test options and helpers
process.env.NODE_ENV = 'test';
var chai = global.chai = require('chai');
var request = global.request = require('request');
global.expect = chai.expect;

// kick off server
var server = exports.server = require(__dirname + '/..');

var url = exports.url = function() {
	return 'http://localhost:3000/v1/scan';
};

exports.scan = function(xslt, done) {
	request({
		url: url(),
		method: 'POST',
		json: {	xslt: xslt }
	}, done);
};

exports.fixtures = {
	html: fs.readFileSync(__dirname + '/fixtures/html.xslt').toString(),
	transform_1: fs.readFileSync(__dirname + '/fixtures/transform_1.xslt').toString()
};

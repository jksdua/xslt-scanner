/* jshint node:true */

'use strict';

const ONE_WEEK = 7 * 24 * 60 * 60; // 1 week

var _ = require('lodash');
var koa = require('koa-framework');
var logger = require(__dirname + '/logger');
var staticCache = require('koa-static-cache');

var process = require(__dirname + '/process');
var config = require(__dirname + '/config');

var app = koa.app().createServer(config.get('port'), config.get('host'));

// static client and common middleware
app.webapp.use(staticCache(__dirname + '/static', {
	maxAge: ONE_WEEK,
	alias: {
		'/': '/index.html'
	}
}));

app.addApi('v1');
app.api.v1.router.post('/scan', function *() {
	logger.info('Received request from %s', this.req.headers.host);

	var result = process(this.request.body.xslt);

	// transform result
		// level 1 - rule type
		// level 2 - rule id
		// level 3 - result
	_.each(result, function(category, categoryId) {
		_.each(category, function(findings, itemId) {
			result[categoryId][itemId] = _.map(findings, function(finding) {
				return {
					lineNumber: finding.lineNumber,
					columnNumber: finding.columnNumber
				};
			});
		});
	});

	this.body = result;
}, {
	parse: 'json',
	schema: {
		body: {
			xslt: { type: 'string', required: true }
		}
	}
});

app.ready();

module.exports = app;

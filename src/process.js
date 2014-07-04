/* jshint node:true */

'use strict';

var _ = require('lodash');
var dom = require('xmldom').DOMParser;
var select = require('xpath.js');
var logger = require(__dirname + '/logger');

var rules = require('require-dir')(__dirname + '/rules');


var engine = {

	attributes: function(doc, rules) {
		var found = {};

		rules.forEach(function(rule) {
			var query = '//*[@' + rule.attribute + '=\'' + rule.value + '\']';
			logger.debug('Trying attribute rule `%s` with query `%s`', rule.attribute, query);

			found[rule.attribute] = select(doc, query);
			logger.debug('Found %d', found[rule.attribute].length);
		});

		return found;
	},

	tags: function(doc, rules) {
		var found = {};
		rules.forEach(function(rule) {
			var query = '//' + rule.tag;
			logger.debug('Trying tag rule `%s` with query `%s`. Has processor? %s', rule.tag, query, !!rule.isVulnerable);

			found[rule.tag] = select(doc, query);

			if (rule.isVulnerable) {
				found[rule.tag] = found[rule.tag].filter(rule.isVulnerable);
			}

			logger.debug('Found %d', found[rule.tag].length);
			return found;
		});

		return found;
	},

	query: function(doc, rules) {
		var found = {};
		rules.forEach(function(rule) {
			logger.debug('Trying rule `%s` with query `%s`', rule.id, rule.query);

			found[rule.id] = select(doc, rule.query);

			logger.debug('Found %d', found[rule.id].length);
			return found;
		});

		return found;
	}

};


module.exports = function(xmlString) {
	logger.info('Parsing xml (first 100 characters):`%s`', xmlString.substring(0, 299));

	var doc = new dom().parseFromString(xmlString);

	var found = {};
	_.each(engine, function(runner, type) {
		found[type] = runner(doc, rules[type]);
	});

	return found;
};

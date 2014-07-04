var logger = module.exports = exports = require('winston');

if (process.env.NODE_ENV === 'test') {
	logger.level = 'critical';
}

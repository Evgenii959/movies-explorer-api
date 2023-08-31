const rateLimit = require('express-rate-limit');
const { codeMessage } = require('../errors/errors');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: codeMessage.RATE_LIMIT,
});

module.exports = limiter;

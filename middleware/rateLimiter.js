const rateLimit = require('express-rate-limit');

exports.rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 'error',
        message: 'Too many requests from this IP'
    }
});
const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(statusCode);

    res.json({
        status: false,
        message: err.message,
        stack: process.env.NODE_ENV !== 'production' && err.stack,
    });
};

module.exports = {
    errorHandler,
};
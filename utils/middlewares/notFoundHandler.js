const boom = require('@hapi/boom');

function notFoundHandler(req, res){
    const {
        output: {statusCode, payload}
    } = boom.notFound();

    res.status(statusCode).json({error: payload});
}

module.exports = notFoundHandler;
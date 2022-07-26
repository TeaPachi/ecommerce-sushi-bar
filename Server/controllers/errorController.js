module.exports = (err, req, res, next ) => {
    const statusCode = err.statusCode || 500;
    const status = statusCode.toString()[0] === 4 ? 'fail' : 'error'

    res.status(statusCode).json({
        status,
        message: err.message
    })
}
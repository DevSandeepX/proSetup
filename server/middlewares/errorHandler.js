const { logEvents } = require('./logger');

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}\t${err.message}\t${req.method}\t${req.headers.origin}\t ${req.url}`, 'errLog.log');
  console.error(err.stack); // Print to console
const status = res.statusCode ? res.statusCode : 500
  res.status(status).json({
    message: err.message,
  });
};

module.exports = errorHandler;

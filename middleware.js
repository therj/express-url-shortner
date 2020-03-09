const rateLimit = require(`express-rate-limit`);
const mung = require(`express-mung`);

// Not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error handling
const errorHandler = (error, _req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    message: error.message,
    error: process.env.NODE_ENV === `production` ? `🥞` : error.stack,
  });
  next();
};

// eslint-disable-next-line no-unused-vars
const modifyResponseBody = (body, req, _res) => {
  // Modify response here
  // Attach the request to response, if requested
  if (body && req.body.returnRequest) {
    body.request = { body: req.body, headers: req.headers };
  }
  return body;
};

// TODO: Switch to a redis store in production!
// maxReq in windowMinutes will block the user!
const rateLimiter = (windowMinutes, maxReq, resHeaders) => {
  const windowMs =
    Number(windowMinutes || process.env.LIMIT_WINDOW || `15`) * 60 * 1000;
  const max = Number(maxReq || process.env.LIMIT_REQ || `100`);
  return rateLimit({
    windowMs,
    max,
    headers: resHeaders || false,
    statusCode: 400,
    handler(_req, res, next) {
      const error = new Error(`Too many requests!`);
      res.status(418);
      next(error);
    },
  });
};
module.exports = {
  notFound,
  errorHandler,
  modifyResponseBody: mung.json(modifyResponseBody, { mungError: true }),
  rateLimiter,
};

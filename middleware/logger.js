const logger = (req, res, next) => {
  console.log("logger @route", req.method, req.url);
  next();
};

module.exports = logger;

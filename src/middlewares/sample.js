function sample_middleware(req, res, next) {
  const header = req.headers;
  console.log("Headers:", header);
  next();
}

module.exports = sample_middleware;

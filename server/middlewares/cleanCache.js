const { clearHash } = require("../services/cache");

module.exports = async (req, res, next) => {
  // this trick allows the route handler to run first
  // and after that clear our cache
  await next();

  clearHash(req.user.id);
};

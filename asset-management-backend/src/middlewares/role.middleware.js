module.exports = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error("Forbidden: Access denied");
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
};

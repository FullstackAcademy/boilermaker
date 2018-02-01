const gatekeeperMiddleware = {};

gatekeeperMiddleware.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    // not authenticated: i.e. "try logging in"
    res.sendStatus(401);
  }
};

gatekeeperMiddleware.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    // forbidden: i.e. "you are not allowed to do this"
    res.sendStatus(403);
  }
};

gatekeeperMiddleware.isAdminOrSelf = (req, res, next) => {
  if (req.user.isAdmin || req.user.id === req.params.id) {
    next();
  } else {
    // forbidden: i.e. "you are not allowed to do this"
    res.sendStatus(403);
  }
};

module.exports = gatekeeperMiddleware;
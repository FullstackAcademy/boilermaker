const gatekeeperMiddleware = {};

gatekeeperMiddleware.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    // not authenticated: i.e. "try logging in"
    res.sendStatus(401);
  }
};

gatekeeperMiddleware.isSelf = (req, res, next) => {
  if (req.user.id === Number(req.params.userId)) {
    next();
  } else {
    // forbidden: i.e. "you are not allowed to do this"
    res.sendStatus(403);
  }
};

gatekeeperMiddleware.isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    // forbidden: i.e. "you are not allowed to do this"
    res.sendStatus(403);
  }
};

gatekeeperMiddleware.isAdminOrSelf = (req, res, next) => {
  if (req.user.admin || req.user.id === Number(req.params.userId)) {
    next();
  } else {
    // forbidden: i.e. "you are not allowed to do this"
    res.sendStatus(403);
  }
};

module.exports = gatekeeperMiddleware;
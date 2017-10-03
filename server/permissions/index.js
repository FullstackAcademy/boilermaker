const deny = next => {
  const err = new Error('Not allowed!')
  err.status = 401
  next(err)
}

const _isLoggedIn = req => !!req.user

const _isAdmin = req => req.user.isAdmin

const _isSelf = req => req.user.id === req.requestedUser.id

module.exports = {
  isLoggedIn (req, res, next) {
    _isLoggedIn(req) ? next() : deny(next)
  },

  isAdmin (req, res, next) {
    _isLoggedIn(req) && _isAdmin(req) ? next() : deny(next)
  },

  isSelf (req, res, next) {
    _isLoggedIn(req) && _isSelf(req) ? next() : deny(next)
  }
}

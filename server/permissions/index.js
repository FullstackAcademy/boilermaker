/**
 * This is an example of a small permissions framework that implements
 * basic access control with Express middleware functions. Remember
 * that 'middleware' in Express is just a function that expects to receive
 * the three arguments: req, res, next. Assuming the presence of 'req.user'
 * (which `passport` gives to us) and a 'req.requestedUser' (which we place
 * ourselves in our user api routes), we can check whether the user requesting
 * a specific resource should be allowed to continue, or whether we should send
 * a 401.
 *
 * To see how these pieces of middleware get used, check out `server/api/users.js`
 */
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

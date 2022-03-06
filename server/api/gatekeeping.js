const {User} = require('../db')

// store all of our functions that
// will act as middleware between our request and our response
// and we will use it as we see fit

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log('token', token)
    const user = await User.findByToken(token)
    req.user = user
  } catch (error) {
    
    next(error)
  }
}

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('Halt, you shall not pass!')
  } else {
    // if my user is an admin, let them through
    next()
  }
}

module.exports = {requireToken, isAdmin}

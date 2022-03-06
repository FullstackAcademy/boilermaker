const router = require('express').Router()
const User = require('../db/models/user')

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});
router.post('/signup', async (req, res, next) => {
  try {
    // we trust that our users will only pass in a username and password AND our 
    //browser only allows is to form inputs so it shouldnt matter what 
    //we do in the backend becsue we are protected ...right? 
    const { email, password } = req.body
    // destructuring both of these helps prevent injection attacks
    // by way of making the user an admin. 
    const user = await User.create({ email, password});
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})



router.get('/me', async (req, res, next) => {
  try {
    console.log('this right hurrrrr', req.headers)
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.use('/google', require('./google'))




module.exports = router




/// do not delete until final => original auth for user

// router.post('/login', async (req, res, next) => {
//   try {
//     const user = await User.findOne({where: {email: req.body.email}})
//     if (!user) {
//       console.log('No such user found:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else if (!user.correctPassword(req.body.password)) {
//       console.log('Incorrect password for user:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else {
//  
//       req.login(user, err => (err ? next(err) : res.json(user)))
     
//     }
    
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/signup', async (req, res, next) => {
//   try {
//     const { email, password } = req.body
//     const user = await User.create({ email, password } )
//     //res.send({ token: await user.generateToken() });
//     req.login(user, err => (err ? next(err) : res.json(user)))
    
//   } catch (err) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       res.status(401).send('User already exists')
//     } else {
//       next(err)
//     }
//   }
// })

// router.get('/me', (req, res) => {
//   console.log('here', req.headers.authorization)
//   res.json(req.user)
// })

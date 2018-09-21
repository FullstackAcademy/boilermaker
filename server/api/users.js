const router = require('express').Router()
const {User, Course, Lecture} = require('../db/models')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    // only admin or logged-in user can get this api route result.
    if (!req.user || !req.user.admin) {
      res.status(403).send('Forbidden')
      return;
    }

    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err)
  }
});

// GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  try{
    // only logged-in admin or its own user can get the result of this api route.
    if (
      !req.user ||
      !req.user.admin ||
      req.user.id !== Number(userId)
    ) {
      res.status(403).send('Forbidden')
      return
    }

    const user = await User.findById(userId);
    // in case user is not, found send back 404 with a message.
    if(!user){
      res.status(404).send("User Not Found");
      return;
    }

    res.json(user);
  }catch(err){
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try{
    // Note that in the User db definition, duplicate email is not allowed.
    const {email, password, googleId} = req.body;

    let admin = false
    if (req.user && req.user.admin) {
      admin = req.body.admin
    }

    const userBody = {
      email,
      password,
      googleId,
      admin,
    }

    const user = await User.create(userBody)
    res.json(user)
  }catch(err){
    next(err);
  }
});

router.put('/:userId', async (req, res, next) => {
  try{
    const userId = req.params.userId;

    // Note that only either admin or the account holder is allowed to update the user account.
    if (!req.user || !req.user.admin || req.user.id !== Number(userId)) {
      res.status(403).send('Forbidden')
      return
    }

    const user = await User.update(req.body, {
      where: {
        id: userId,
      },
      returning: true
    });

    if (!user) {
      res.status(404).send('User Not Found');
      return;
    }

    res.json(user)
  }catch(err){
    next(err);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try{
    // For now, this route is not availble.
    // await User.destroy({
    //  where: {
    //   id: req.params.userId,
    //  }
    // });
  }catch(err){
    next(err);
  }
});

// GET /api/users/:userId/courses - getting all the list of courses of this user(userId)
router.get('/:userId/courses', async (req, res, next) => {
  const userId = req.params.userId;
  try{
    // only logged-in admin or its own user can get the result of this api route.
    if (
      !req.user ||
      !req.user.admin ||
      req.user.id !== Number(userId)
    ) {
      res.status(403).send('Forbidden')
      return
    }

    const user = await User.findById(userId, {include: [Course]});
    // in case user is not, found send back 404 with a message.
    if(!user){
      res.status(404).send("User Not Found");
      return;
    }

    res.json(user);
  }catch(err){
    next(err);
  }
});

// GET /api/users/:userId/courses/:courseId - getting a class of this user(userId) including all the lectures associated with the courses
router.get('/:userId/courses/:courseId', async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const courseId = req.params.courseId;

    const user = await User.findById(userId);
    if(!user){
      res.status(404).send('User Not Found');
      return;
    }

    const course = await Course.findOne({
      where: {
        id: courseId,
        userId: userId,
      },
      include: [Lecture]
    });

    if(!course){
      res.status(404).send('Course Not Found');
      return;
    }

    res.json(course);
  }catch(err){
    next(err);
  }
});

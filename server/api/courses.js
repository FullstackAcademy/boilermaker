const router = require('express').Router();
const {Course} = require('../db/models');
module.exports = router;

// POST /api/courses/
router.post('/', async(req, res, next) => {
  try{
    const {name, userId} = req.body;

    // check if user has been created a course with the same name
    let course = await Course.findOne({
      where: {
        name, userId
      }
    });

    if(course){
      console.log(`There is already a course with the same course created by given user - ${userId}, ${name}`);
    }else{
      course = await Course.create( {name, userId});
    }

    res.json(course);
  }catch(err){
    next(err);
  }
});

// PUT /api/courses/:courseId
router.put('/:courseId', async (req, res, next) => {
  try{
    if(!req.user || !req.user.admin){
      res.status(403).send('Forbidden');
    }

    const courseBody = {
      name: req.body.name,
      userId: req.body.userId,
    }

    if(req.user.admin || req.user.id === Number(req.params.userId)){
      const course = await Course.update(courseBody, {
        where: {
          id: req.params.courseId,
        },
        returning: true,
      });

      if(!course){
        res.status(404).send('Course Not Found');
        return;
      }else{
        res.json(course);
      }
    }
  }catch(err){
    next(err);
  }
})

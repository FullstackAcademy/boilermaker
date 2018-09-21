const router = require('express').Router();
const {Course, Lecture} = require('../db/models');
module.exports = router;

router.get('/:classId', async(req, res, next) => {
  const classId = req.params.classId;
  try{
    // TODO: user privilege check

    const course = await Course.findById(classId);
    if(!course){
      res.status(404).send("Not Found");
      return;
    }

    return res.status(200).json(course);
  }catch(err){
    next(err);
  }
});


router.get('/:classId/lectures/:lectureId', async(req, res, next) => {
  const classId = req.params.classId;
  const lectureId = req.params.lectureId;

  try{
    // TODO: user privilege check

    const course = await Course.findById(classId, {include: [Lecture]});
    if(!course){
      res.status(404).send('Not Found');
      return;
    }

    let lectureFound;
    for(let lecture of course.lectures){
      if(lecture.id === lectureId){
        lectureFound = lecture;
      }
    }

    if(!lectureFound){
      res.status(404).send('Lecture Found');
    }

    return res.status(200).json(lectureFound);
  }catch(err){
    next(err);
  };
});

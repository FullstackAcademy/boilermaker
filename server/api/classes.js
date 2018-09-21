const router = require('express').Router();
const {Class, Lecture} = require('../db/models');
module.exports = router;

router.get('/:classId', async(req, res, next) => {
  const classId = req.params.classId;
  try{
    // TODO: user privilege check

    const classFound = await Class.findById(classId);
    if(!classFound){
      res.status(404).send("Not Found");
      return;
    }

    return res.status(200).json(classFound);
  }catch(err){
    next(err);
  }
});


router.get('/:classId/lectures/:lectureId', async(req, res, next) => {
  const classId = req.params.classId;
  const lectureId = req.params.lectureId;

  try{
    // TODO: user privilege check

    const classFound = await Class.findById(classId, {include: Lecture});
    if(!classFound){
      res.status(404).send('Not Found');
      return;
    }

    let lectureFound;
    for(let lecture of classFound.lectures){
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

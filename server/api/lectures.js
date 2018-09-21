const router = require('express').Router();
const {Lecture} = require('../db/models');
module.exports = router;

// POST
router.post('/', async(req, res, next) => {
  try{
    const {title, youtube_url, note, userId, courseId} = req.body;

    let lecture = await Lecture.findOne({
      where: {
        youtube_url, userId
      }
    });

  }catch(err){
    next(err);
  }
});

// PUT
router.put('/:lectureId', async(req, res, next) => {
  const lectureId = req.params.lectureId;

  try{
    if(!req.user || !req.user.admin){
      res.status(403).send('Forbidden');
    }

    const lectureBody = {
      name: req.body.title,
      youtube_url: req.body.youtube_url,
      note: req.body.note,
      userId: req.body.userId,
      courseId: req.body.courseId,
    }

    const tempLecture = await Lecture.findById(lectureId);
    if(!tempLecture){
      res.status(404).send();
      return;
    }

    if(req.user.admin || req.user.id === req.tempLecture.userId){
      const lecture = await Lecture.update(lectureBody, {
        where: {
          id: req.params.lecture,
        },
        returning: true,
      });

      if(!lecture){
        res.status(404).send('Course Not Found');
        return;
      }else{
        res.json(lecture);
      }
    }
  }catch(err){
    next(err);
  }
});

// DELETE
router.delete('/lectures/:lectureId', async (req, res, next) => {
  const lectureId = req.params.lectureId;
  try{
    const lecture = await Lecture.findById(lectureId);
    if(!lecture){
      res.status(404).send("Lecture Not Found");
      return;
    }

    if(!req.user.admin && req.user.id !== lecture.userId){
      res.status(403).send('Forbidden');
      return;
    }

    await Lecture.destroy({
      where: {id: lectureId}
    })

    res.status(201).send();
  }catch(err){
    next(err);
  }
});

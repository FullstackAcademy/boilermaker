const router = require('express').Router();
module.exports = router;

router.get('/puppies', (req, res, next) => res.json('Puppies!'))

router.use((req, res, next) => {
  res.status(404).send('Not found');
});

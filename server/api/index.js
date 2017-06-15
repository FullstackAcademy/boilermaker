const router = require('express').Router();
module.exports = router;


router.use((req, res) => {
  res.status(404).send('Not found');
});

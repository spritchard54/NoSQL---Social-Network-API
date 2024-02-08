const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// https://localhost:3001/api

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;

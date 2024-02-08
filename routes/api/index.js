const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const usersRoutes = require('./usersRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);
// https://localhost:3001/api/users

module.exports = router;
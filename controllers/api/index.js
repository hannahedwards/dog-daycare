const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reservationRoutes = require('./reservationRoutes')
//http://localhost:3001/api/user
router.use('/user', userRoutes);
//http://localhost:3001/api/reservation
router.use('/reservation', reservationRoutes)

module.exports = router;
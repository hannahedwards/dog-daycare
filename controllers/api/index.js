const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reservationRoutes = require('./reservationRoutes')

router.use('/user', userRoutes);
router.use('/reservation', reservationRoutes)

module.exports = router;
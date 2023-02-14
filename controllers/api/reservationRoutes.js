const router = require('express').Router();
const { Reservation } = require('../../models');
const withAuth = require('../../utils/auth');

//http://localhost:3001/api/reservation/
router.post('/', withAuth, async (req, res) => {
    try {
      const newReservation = await Reservation.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newReservation);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  //http://localhost:3001/api/reservation/1
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const reservationData = await Reservation.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!reservationData) {
        res.status(404).json({ message: 'No reservation found with this account!' });
        return;
      }
  
      res.status(200).json(reservationData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
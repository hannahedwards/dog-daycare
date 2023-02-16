const router = require('express').Router();
const { Reservation, User } = require('../models') //requiring models 
const withAuth = require('../utils/auth');

//shows homepage.handlebars content that is hardcoded
router.get('/', (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
});

//http://localhost:3001/reservation/
router.get('/reservation', async (req, res) => { 
    try {
        const reservationData = await Reservation.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        //console.log(reservationData);
         const reservations = reservationData.map(reservation => reservation.get({ plain: true }));

        res.render('dashboard', {
             ...reservations,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log (err);
        res.status(500).json(err);
    }
});


//http://localhost:3001/user/
router.get('/user', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Reservation }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//http://localhost:3001/login/
//currently renders our login page where you are asked to sign in or sign up
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/user'); 
        return;
    }
    res.render('login');
});




module.exports = router;
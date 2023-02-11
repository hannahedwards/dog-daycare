const router = require('express').Router();
const { Reservation, User } = require('../models') //requiring models 
const withAuth = require('../utils/auth');

//CRUD commands below 
router.get('/', (req, res)=> {
try {res.render('homepage'); //shows homepage.handlebars content 
} catch (err) {
    res.status(500).json(err);
}
});

//currently renders the reservation form, if typed in manually as "reservation/1"
// router.get('/reservation/:id', async (req, res) => { 
//     try {
//         const reservationData = await Reservation.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name'],
//                 },
//             ],
//         });

//          const reservation = reservationData.get({ plain: true });

//         res.render('dashboard', {
//             ...reservation,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         console.log (err);
//         res.status(500).json(err);
//     }
// });
router.get('/user', withAuth, async (req, res) => { //currently renders our login page where you are asked to sign in or sign up, but end point shows login, not user 
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

// router.get('/user', withAuth, async (req, res) => { //currently renders our login page where you are asked to sign in or sign up, but end point shows login, not user 
//     try {
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: [{ model: Reservation }],
//         });

//         const user = userData.get({ plain: true });

//         res.render('dashboard', {
//             ...user,
//             logged_in: true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/login', (req, res) => { //currently renders our login page where you are asked to sign in or sign up
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});




module.exports = router;
const router = require('express').Router();
const { Reservation, User } = require('../models') //requiring models 
const withAuth = require('../utils/auth');

//CRUD commands below 
router.get('/', (req, res)=> {
try {res.render('homepage');
} catch (err) {
    res.status(500).json(err);
}
});


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

router.get('/user', withAuth, async (req, res) => {
    try {
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

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});




module.exports = router;
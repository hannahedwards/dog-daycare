const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes); //Display/HTML routes 
//http://localhost:3001/api
router.use('/api', apiRoutes); //CRUD operations

module.exports = router;

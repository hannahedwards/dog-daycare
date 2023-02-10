const sequelize = require('../config/connection');
const { User, Reservation } = require('../models');

const userData = require('./userData.json');
const reservationData = require('./reservationData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, { //inserts multiple instances in bulk
        individualHooks: true,
        returning: true,
    });

    for (const reservation of reservationData) {
        await Reservation.create({
            ...reservation, //expands an array into its elements, getting all reservations
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    process.exit(0); //end the process without any kind of failure? when no async operations are performing
};

seedDatabase();
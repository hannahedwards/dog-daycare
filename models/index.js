const User = require('./User');
const Reservation = require('./Reservation')

User.hasMany(Reservation, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Reservation.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = { User, Reservation };


const User = require('./User');
const Reservation = require('./Reservation')

User.hasMany(Reservation, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    // unique: false,
});

Reservation.belongsTo(User, {
   foreignKey: 'user_id', 
//    unique: false,
});


module.exports = { User, Reservation };


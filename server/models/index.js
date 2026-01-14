const sequelize = require('../config/database');
const User = require('./User');
const Startup = require('./Startup');
const Program = require('./Program');
const Application = require('./Application');
const Resource = require('./Resource');
const Mentor = require('./Mentor');
const Contact = require('./Contact');
const Otp = require('./otp');

// Associations

// User <-> Startup (Founder relationship)
User.hasOne(Startup, { foreignKey: 'founder_id' });
Startup.belongsTo(User, { foreignKey: 'founder_id' });

// Startup <-> Application
Startup.hasMany(Application, { foreignKey: 'startup_id' });
Application.belongsTo(Startup, { foreignKey: 'startup_id' });

// Program <-> Application
Program.hasMany(Application, { foreignKey: 'program_id' });
Application.belongsTo(Program, { foreignKey: 'program_id' });

module.exports = {
    sequelize,
    User,
    Startup,
    Program,
    Application,
    Resource,
    Mentor,
    Contact,
    Otp
};

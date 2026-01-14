const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mentor = sequelize.define('Mentor', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expertise: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
    },
    image_url: {
        type: DataTypes.STRING,
    },
    linkedin_url: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true,
});

module.exports = Mentor;

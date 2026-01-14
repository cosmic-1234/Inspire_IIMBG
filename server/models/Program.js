const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Program = sequelize.define('Program', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    timeline: {
        type: DataTypes.STRING // Could be JSON or text description
    },
    eligibility: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('upcoming', 'open', 'closed', 'ongoing'),
        defaultValue: 'upcoming'
    }
}, {
    timestamps: true
});

module.exports = Program;

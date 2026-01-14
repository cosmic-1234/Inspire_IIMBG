const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Startup = sequelize.define('Startup', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    logo_url: {
        type: DataTypes.STRING
    },
    industry: {
        type: DataTypes.STRING
    },
    stage: {
        type: DataTypes.STRING // e.g., Ideation, MVP, Scaling
    },
    website_url: {
        type: DataTypes.STRING
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

module.exports = Startup;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    status: {
        type: DataTypes.ENUM('draft', 'submitted', 'under_review', 'shortlisted', 'rejected', 'accepted'),
        defaultValue: 'draft'
    },
    submission_data: {
        type: DataTypes.JSONB // Flexible form data
    }
}, {
    timestamps: true
});

module.exports = Application;

import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Vote = sequelize.define('Vote', {
    candidate: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

export default Vote;

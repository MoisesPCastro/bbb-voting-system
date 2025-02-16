import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const VoteStats = sequelize.define('VoteStats', {
    candidate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalVotes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, { timestamps: true });

export default VoteStats;

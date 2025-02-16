import VoteStats from '../models/voteStats.js';
import { sequelize } from '../models/index.js';

class VoteStatsRepository {
    async getTotalVotes() {
        console.log("🔍 Buscando total de votos do banco...");
        return await VoteStats.sum('totalVotes');
    }

    async getVotesByCandidate() {
        return await VoteStats.findAll({
            attributes: ['candidate', [sequelize.fn('SUM', sequelize.col('totalVotes')), 'totalVotes']],
            group: ['candidate'],
        });
    }

    async getVotesByHour() {
        return await VoteStats.findAll({
            attributes: [
                [sequelize.fn('strftime', '%Y-%m-%d %H:00:00', sequelize.col('createdAt')), 'hour'],
                [sequelize.fn('SUM', sequelize.col('totalVotes')), 'totalVotes']
            ],
            group: ['hour'],
        });
    }
}

export default new VoteStatsRepository();

import Vote from '../models/vote.js';
import VoteStats from '../models/voteStats.js';
import { sequelize } from '../models/index.js';

class VoteRepository {

    async addCandidate(candidate) {
        return await Vote.create({ candidate });
    }

    async getAllCandidates() {
        const candidates = await Vote.findAll({
            attributes: ['id', 'candidate'],
        });

        const totalCandidates = await Vote.count();

        return { totalCandidates, candidates };
    }

    async getCandidates(candidate) {
        return await Vote.findOne({
            where: { candidate },
            attributes: ['candidate']
        });
    }

    async saveVote(candidate) {
        const transaction = await sequelize.transaction();

        try {
            const [stats, created] = await VoteStats.findOrCreate({
                where: { candidate },
                defaults: { totalVotes: 1 },
                transaction
            });

            if (!created) {
                stats.totalVotes += 1;
                await stats.save({ transaction });
            }

            await transaction.commit();
            return stats;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

}

export default new VoteRepository();

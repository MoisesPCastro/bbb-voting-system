import Vote from '../models/vote.js';
import VoteStats from '../models/voteStats.js';
import { sequelize } from '../models/index.js';

class VoteRepository {

    async addCandidate(candidate) {
        return await Vote.findOrCreate({
            where: { candidate },
            defaults: { candidate }
        });
    }

    async getAllCandidates() {
        return await Vote.findAll({
            attributes: ['candidate'],
            raw: true
        });
    }

    async getCandidates() {
        return await Vote.findOne({
            attributes: ['candidate'],
            raw: true
        });
    }

    async saveVote(candidate) {
        const transaction = await sequelize.transaction();

        try {

            const [stats, created] = await VoteStats.findOne({
                where: { candidate },
                defaults: { totalVotes: 1 },
                transaction
            });

            if (!created) {
                stats.totalVotes += 1;
                await stats.save({ transaction });
            }

            await transaction.commit();
            return candidateExists;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

export default new VoteRepository();

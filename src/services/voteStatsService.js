import redisClient from '../utils/redisClient.js';
import VoteStatsRepository from '../repositories/voteStatsRepository.js';
import logger from '../utils/logger.js';

class VoteStatsService {
    async getStats() {
        const cacheKey = 'voteStats';

        try {
            const cachedStats = await redisClient.get(cacheKey);
            if (cachedStats) {
                return JSON.parse(cachedStats);
            }

            const totalVotes = await VoteStatsRepository.getTotalVotes();
            const votesByCandidate = await VoteStatsRepository.getVotesByCandidate();
            const votesByHour = await VoteStatsRepository.getVotesByHour();

            const stats = { totalVotes, votesByCandidate, votesByHour };

            // Salva no Redis com expiração de 10 segundos
            await redisClient.set(cacheKey, JSON.stringify(stats), 'EX', 10);

            return stats;
        } catch (error) {
            logger.error(`Erro ao buscar status dos votos: ${error.message}`);
            throw error;
        }
    }
}

export default new VoteStatsService();

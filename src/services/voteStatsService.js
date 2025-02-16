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

            await redisClient.set(cacheKey, JSON.stringify(stats));
            await redisClient.expire(cacheKey, 15); // TODO Garante que a chave expira após 15 segundos


            return stats;
        } catch (error) {
            logger.error(`Erro ao buscar status dos votos: ${error.message}`);
            throw error;
        }
    }
}

export default new VoteStatsService();

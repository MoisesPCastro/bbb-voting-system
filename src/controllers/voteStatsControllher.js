import VoteStatsService from '../services/voteStatsService.js';
import HttpReturnCodes from '../utils/httpReturnCodes.js';
import logger from '../utils/logger.js';

class VoteStatsController {
    async getStats(_req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        try {
            const stats = await VoteStatsService.getStats();
            return httpReturnCodes.ok(stats);
        } catch (error) {
            logger.error(`Erro ao buscar status dos votos: ${error.message}`);

            return httpReturnCodes.internalServerError(error.message);
        }
    }
}

export default new VoteStatsController();

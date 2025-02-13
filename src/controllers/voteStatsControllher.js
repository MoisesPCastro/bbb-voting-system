import VoteStatsService from '../services/voteStatsService.js';
import HttpReturnCodes from '../utils/httpReturnCodes.js';

class VoteStatsController {
    async getStats(_req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        try {
            const stats = await VoteStatsService.getStats();
            return httpReturnCodes.ok(stats);
        } catch (error) {
            return httpReturnCodes.internalServerError(error.message);
        }
    }
}

export default new VoteStatsController();

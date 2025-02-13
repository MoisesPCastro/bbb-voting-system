import HttpReturnCodes from '../utils/httpReturnCodes.js';

class VoteController {
    async create(_req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        return httpReturnCodes.ok('chegou no controller');
    }
}

export default new VoteController();

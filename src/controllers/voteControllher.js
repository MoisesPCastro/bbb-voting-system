const HttpReturnCodes = require('../utils/httpReturnCodes');


class VoteController {
    async create(_req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        return httpReturnCodes.ok('chegou no controller')
    }
}

module.exports = new VoteController();
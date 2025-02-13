import VoteService from '../services/voteService.js';
import HttpReturnCodes from '../utils/httpReturnCodes.js';

class VoteController {
    async create(req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        try {
            const { candidate } = req.body;
            if (!candidate) {
                return httpReturnCodes.badRequest('O campo candidate é obrigatório.');
            }

            const vote = await VoteService.createVote(candidate);
            return httpReturnCodes.created({ message: 'Voto registrado com sucesso.', vote });
        } catch (error) {
            return httpReturnCodes.internalServerError(error.message);
        }
    }
}

export default new VoteController();

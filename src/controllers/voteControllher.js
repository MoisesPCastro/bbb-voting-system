import VoteService from '../services/voteService.js';
import HttpReturnCodes from '../utils/httpReturnCodes.js';

class VoteController {
    constructor() {
        this.msgNameRequired = 'O nome do candidato é obrigatório.';
    }

    async addCandidate(req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        try {
            const { candidate } = req.body;
            if (!candidate) {
                return httpReturnCodes.badRequest(this.msgNameRequired);
            }

            await VoteCandidateService.addCandidate(candidate);
            return httpReturnCodes.created({ message: `Candidato ${candidate} adicionado à lista de votação.` });
        } catch (error) {
            return httpReturnCodes.internalServerError(error.message);
        }
    }

    async getCandidates(_req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        try {
            const candidates = await VoteCandidateService.getCandidates();
            return httpReturnCodes.ok(candidates);
        } catch (error) {
            return httpReturnCodes.internalServerError(error.message);
        }
    }

    async saveVote(req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        try {
            const { candidate } = req.body;
            if (!candidate) {
                return httpReturnCodes.badRequest(this.msgNameRequired);
            }

            const vote = await VoteService.saveVote(candidate);
            return httpReturnCodes.created({ message: 'Voto registrado com sucesso.', vote });
        } catch (error) {
            return httpReturnCodes.internalServerError(error.message);
        }
    }
}

export default new VoteController();

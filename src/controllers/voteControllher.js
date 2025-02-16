import VoteService from '../services/voteService.js';
import HttpReturnCodes from '../utils/httpReturnCodes.js';
import logger from '../utils/logger.js';
import { verifyRecaptcha } from '../utils/recaptcha.js';

const msgNameRequired = 'O nome do candidato é obrigatório.';

class VoteController {

    async addCandidate(req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        try {
            const { candidate } = req.body;
            if (!candidate) {
                return httpReturnCodes.badRequest(msgNameRequired);
            }

            await VoteService.addCandidate(candidate);
            return httpReturnCodes.created({ message: `Candidato ${candidate} adicionado à lista de votação.` });
        } catch (error) {
            logger.error(`Erro ao registrar canditatos a votação: ${error.message}`);

            return httpReturnCodes.internalServerError(error.message);
        }
    }

    async getAllCandidates(_req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        try {
            const candidates = await VoteService.getAllCandidates();
            return httpReturnCodes.ok(candidates);
        } catch (error) {
            return httpReturnCodes.internalServerError(error.message);
        }
    }

    async saveVote(req, res) {
        const httpReturnCodes = new HttpReturnCodes(res);
        try {
            const { candidate, recaptchaToken } = req.body;
            if (!candidate) {
                return httpReturnCodes.unprocessableEntity(msgNameRequired);
            }

            const isHuman = await verifyRecaptcha(recaptchaToken);
            if (!isHuman) {
                return httpReturnCodes.forbidden("Voto recusado: origem suspeita detectada.");
            }

            await VoteService.saveVote(candidate);
            return httpReturnCodes.ok({ message: 'Voto enviado para processamento.' });
        } catch (error) {

            logger.error(`Erro ao registrar voto: ${error.message}`);

            if (error.statusCode === 404) {
                return httpReturnCodes.notFound(error.message);
            }

            return httpReturnCodes.internalServerError(error.message);
        }
    }
}

export default new VoteController();

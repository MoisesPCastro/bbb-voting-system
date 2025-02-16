import { Router } from 'express';
import VoteController from '../controllers/voteControllher.js';
import voteStatsControllher from '../controllers/voteStatsControllher.js';
import reCaptchaController from '../controllers/reCaptchaController.js';

const router = Router();

router.post('/candidates', VoteController.addCandidate); // criar canditato a votação
router.get('/candidates', VoteController.getAllCandidates); // buscar possiveis candidatos a votação
router.post('/votes', VoteController.saveVote); // votar em um candidato
router.get('/stats', voteStatsControllher.getStats) // buscar info votação candidatos
router.get('/generate-recaptcha', reCaptchaController.generateToken); // Gerar token do recaptha para consumir rota de votação e verificação se é humano ao votar

export default router;

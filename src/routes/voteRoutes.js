import { Router } from 'express';
import VoteController from '../controllers/voteControllher.js';
import voteStatsControllher from '../controllers/voteStatsControllher.js';

const router = Router();

router.post('/candidates', VoteController.addCandidate); // criar canditato a votação
router.get('/candidates', VoteController.getCandidates); // buscar possiveis candidatos a votação
router.post('/votes', VoteController.saveVote); // votar em um candidato
router.get('/stats', voteStatsControllher.getStats) // buscar info votação candidatos

export default router;

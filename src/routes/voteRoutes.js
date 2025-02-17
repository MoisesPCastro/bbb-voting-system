import { Router } from 'express';
import VoteController from '../controllers/voteControllher.js';
import voteStatsControllher from '../controllers/voteStatsControllher.js';
import reCaptchaController from '../controllers/reCaptchaController.js';

const router = Router();

router.post('/candidates', VoteController.addCandidate);
router.get('/candidates', VoteController.getAllCandidates);
router.post('/votes', VoteController.saveVote);
router.get('/stats', voteStatsControllher.getStats);
router.get('/generate-recaptcha', reCaptchaController.generateToken);

export default router;

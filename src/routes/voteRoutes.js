import { Router } from 'express';
import VoteController from '../controllers/voteControllher.js';

const router = Router();

router.post('/', VoteController.create);

export default router;

import VoteRepository from '../repositories/voteRepository.js';
import { voteQueue } from '../utils/voteQueue.js';

class VoteService {

    async addCandidate(candidate) {
        return await VoteRepository.addCandidate(candidate);
    }

    async getAllCandidates() {
        return await VoteRepository.getAllCandidates();
    }

    async saveVote(candidate) {

        const candidateExists = await VoteRepository.getCandidates(candidate);

        if (!candidateExists) {
            const error = new Error(`O nome '${candidate}' não se encontra na lista de votação.`);
            error.statusCode = 404;
            throw error;
        }

        await voteQueue.add("register-vote", { candidate });
    }
}

export default new VoteService();

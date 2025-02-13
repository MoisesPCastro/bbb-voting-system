import VoteRepository from '../repositories/voteRepository.js';

class VoteService {
    async createVote(candidate) {
        return await VoteRepository.saveVote(candidate);
    }
}

export default new VoteService();

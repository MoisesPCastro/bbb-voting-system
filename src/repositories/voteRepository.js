import Vote from '../models/vote.js';

class VoteRepository {
    async saveVote(candidate) {
        return await Vote.create({ candidate });
    }
}

export default new VoteRepository();

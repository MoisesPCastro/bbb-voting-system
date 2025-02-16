import Vote from '../models/vote.js';
class VoteRepository {

    async addCandidate(candidate) {
        return await Vote.create({ candidate });
    }

    async getAllCandidates() {
        const candidates = await Vote.findAll({
            attributes: ['id', 'candidate'],
        });

        const totalCandidates = await Vote.count();

        return { totalCandidates, candidates };
    }

    async getCandidates(candidate) {
        return await Vote.findOne({
            where: { candidate },
            attributes: ['candidate']
        });
    }
}

export default new VoteRepository();

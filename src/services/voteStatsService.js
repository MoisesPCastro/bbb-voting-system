import VoteStatsRepository from '../repositories/voteStatsRepository.js';

class VoteStatsService {
    async getStats() {
        const totalVotes = await VoteStatsRepository.getTotalVotes();
        const votesByCandidate = await VoteStatsRepository.getVotesByCandidate();
        const votesByHour = await VoteStatsRepository.getVotesByHour();

        return {
            totalVotes,
            votesByCandidate,
            votesByHour
        };
    }
}

export default new VoteStatsService();

import VoteRepository from '../repositories/voteRepository.js';

class VoteService {

    async addCandidate(candidate) {
        return await VoteCandidateRepository.addCandidate(candidate);
    }

    async getCandidates() {
        return await VoteCandidateRepository.getCandidates();
    }

    async saveVote(candidate) {

        const candidateExists = await VoteRepository.getCandidates(candidate);

        if (!candidateExists) {
            throw new Error(`O candidato '${candidate}' não está na lista de votação.`);
        }

        return await VoteRepository.saveVote(candidate);
    }
}

export default new VoteService();

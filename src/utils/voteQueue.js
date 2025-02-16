import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import logger from './logger.js';
import voteRepository from "../repositories/voteRepository.js";
import redisClient from "./redisClient.js";

const redisConnection = new IORedis({
    maxRetriesPerRequest: null
});

const voteQueue = new Queue("voteQueue", { connection: redisConnection });

// Worker para processar os votos da fila
new Worker(
    "voteQueue",
    async (job) => {
        const { candidate } = job.data;

        try {
            await voteRepository.saveVote(candidate);
            await redisClient.del('voteStats');
        } catch (error) {
            logger.error(`Erro ao processar voto para ${candidate}: ${error.message}`);
            throw error; // Garantindo que o BullMQ possa tentar novamente
        }
    },
    { connection: redisConnection, attempts: 3, backoff: 5000 } // TODO Tenta novamente 3 vezes com 5s de intervalo
);

export { voteQueue };

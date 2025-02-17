import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import logger from "./logger.js";
import VoteStats from "../models/voteStats.js";
import redisClient from "./redisClient.js";

const redisConnection = new IORedis({
    maxRetriesPerRequest: null
});

const voteQueue = new Queue("voteQueue", { connection: redisConnection });

new Worker(
    "voteQueue",
    async (job) => {
        const { candidate } = job.data;

        try {
            const [_, created] = await VoteStats.findOrCreate({
                where: { candidate },
                defaults: { totalVotes: 1 },
            });

            if (!created) {
                await VoteStats.increment("totalVotes", { where: { candidate } });
            }

            await redisClient.del('voteStats');

        } catch (error) {
            logger.error(`Erro ao processar voto para ${candidate}: ${error.message}`);
            throw error;
        }
    },
    { connection: redisConnection, attempts: 3, backoff: 5000 }
);

export { voteQueue };

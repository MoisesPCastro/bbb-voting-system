import { createClient } from 'redis';
import logger from './logger.js';

const redisClient = createClient();

redisClient.on('error', (err) => logger.error(`Erro no Redis: ${err.message}`));

await redisClient.connect();

export default redisClient;

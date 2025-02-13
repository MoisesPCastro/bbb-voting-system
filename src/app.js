import express from 'express';
import cors from 'cors';
import voteRoutes from './routes/voteRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/votes', voteRoutes);

export default app;

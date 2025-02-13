const express = require('express');
const cors = require('cors');
const voteRoutes = require('./routes/voteRoutes');
//const statsRoutes = require('./routes/stats.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/votes', voteRoutes);
//app.use('/api/stats', statsRoutes);

module.exports = app;

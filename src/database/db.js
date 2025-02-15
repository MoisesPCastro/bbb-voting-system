const { Pool } = require('pg');

//TODO não usei esta config pois optei por usar um banco de dados mais leve "SQlite", em produção para um melhor desempenho tera de ser configurado um banco mais robusto
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'bbb_voting',
    password: process.env.DB_PASSWORD || 'admin',
    port: process.env.DB_PORT || 5432,
});

module.exports = pool;

const { Pool } = require('pg');

//TODO não usei esta config pois optei por usar um banco de dados mais leve "SQlite", em produção para um melhor desempenho tera de ser configurado um banco mais robusto
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;

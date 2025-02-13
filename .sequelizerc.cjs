const path = require('path');

module.exports = {
    config: path.resolve(__dirname, 'config', 'config.json'),
    modelsPath: path.resolve(__dirname, 'models'),
    seedersPath: path.resolve(__dirname, 'seeders'),
    migrationsPath: path.resolve(__dirname, 'esm-migrations')
};

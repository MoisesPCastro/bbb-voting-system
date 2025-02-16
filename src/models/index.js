import { Sequelize } from 'sequelize';
import { createRequire } from 'module';

const _require = createRequire(import.meta.url);
const config = _require('../../config/config.json');

const sequelize = new Sequelize(config.development);

export { sequelize };
export default sequelize;

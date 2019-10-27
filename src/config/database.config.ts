import dotenv from 'dotenv';

dotenv.config();

export default {
  dev: {
    database: process.env.DEV_DB_NAME,
    dialect: 'postgres',
    host: process.env.DEV_DB_HOST,
    operatorsAliases: false,
    password: process.env.DEV_DB_PASSWORD,
    port: 5432,
    username: process.env.DEV_DB_USER,
  },
  prod: {
    database: process.env.PROD_DB_NAME,
    dialect: 'postgres',
    host: process.env.PROD_DB_HOST,
    operatorsAliases: false,
    password: process.env.PROD_DB_PASSWORD,
    username: process.env.PROD_DB_USER,
  },
};

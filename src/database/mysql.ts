import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize ({
    dialect : 'mysql',
    host : process.env.HOST,
    username : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

export default sequelize;
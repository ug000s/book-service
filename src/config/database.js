import dotenv from "dotenv";
import {Sequelize} from "sequelize";

dotenv.config();

// Create a new Sequelize instance

const sequelize = new Sequelize(
    process.env.DB_NAME || 'test',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
        define: {
            timestamps: false
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)

// DB connection

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully')
    } catch (e) {
        console.log('Unable to connect to the database: ', e);
    }
}

export {sequelize, dbConnection}
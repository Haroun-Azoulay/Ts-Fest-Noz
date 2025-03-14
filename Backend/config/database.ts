import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbName: string | undefined = process.env.DB_NAME as string;
const dbUser: string | undefined = process.env.DB_USER as string;
const dbHost: string | undefined = process.env.DB_HOST;
const dbDriver: Dialect | undefined = process.env.DB_DRIVER as Dialect;
const dbPassword: string | undefined = process.env.DB_PASSWORD;

console.log("DB_NAME:", dbName);
console.log("DB_USER:", dbUser);
console.log("DB_HOST:", dbHost);
console.log("DB_DRIVER:", dbDriver);
console.log("DB_PASSWORD:", dbPassword);

const sequelizeConnection: Sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    dialect: dbDriver,
  },
);

export default sequelizeConnection;

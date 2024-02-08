"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER;
const dbPassword = process.env.DB_PASSWORD;
console.log('DB_NAME:', dbName);
console.log('DB_USER:', dbUser);
console.log('DB_HOST:', dbHost);
console.log('DB_DRIVER:', dbDriver);
console.log('DB_PASSWORD:', dbPassword);
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver
});
exports.default = sequelizeConnection;
//# sourceMappingURL=database.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class City extends sequelize_1.Model {
}
City.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    insee_code: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    city_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    zip_code: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    label: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    longitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    departement_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    departement_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    region_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    region_geo_json: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "city",
});
exports.default = City;
//# sourceMappingURL=City.js.map
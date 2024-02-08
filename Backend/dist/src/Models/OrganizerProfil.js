"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class OrganizerProfil extends sequelize_1.Model {
}
OrganizerProfil.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    denomination: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    full_adress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    SIRET_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    more_info: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "OrganizerProfil",
});
exports.default = OrganizerProfil;
//# sourceMappingURL=OrganizerProfil.js.map
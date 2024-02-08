"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class ArtistProfil extends sequelize_1.Model {
}
ArtistProfil.init({
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
    url_media: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    picture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    SIRET_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "ArtistProfil",
});
exports.default = ArtistProfil;
//# sourceMappingURL=ArtistsProfil.js.map
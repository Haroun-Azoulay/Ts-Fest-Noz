"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const City_1 = __importDefault(require("./City"));
const OrganizerProfil_1 = __importDefault(require("./OrganizerProfil"));
const ArtistsProfil_1 = __importDefault(require("./ArtistsProfil"));
class User extends sequelize_1.Model {
}
_a = User;
// Static method
User.updateUserRole = (userId, newRole) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield _a.findByPk(userId);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        if (newRole !== "admin") {
            yield user.update({ role: newRole });
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "user",
        validate: {
            isIn: [["admin", "artist", "moderator", "user"]],
        },
    },
    pseudo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "user",
});
User.hasOne(ArtistsProfil_1.default, { foreignKey: 'user_id', as: 'artist_profile' });
User.hasMany(City_1.default, { foreignKey: 'user_id', as: 'city' });
//User.hasMany(Comment, { foreignKey: 'user_id', as: 'comment' });
User.hasMany(OrganizerProfil_1.default, { foreignKey: 'user_id', as: 'organizer_profil' });
exports.default = User;
//# sourceMappingURL=User.js.map
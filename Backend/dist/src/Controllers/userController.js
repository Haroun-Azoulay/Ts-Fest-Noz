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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../Models/User"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// add email refus
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lastname, firstname, password, email, role, pseudo } = req.body;
        if (!lastname || !firstname || !password || !email || !role || !pseudo) {
            return res.status(400).json({
                message: "Il y a un des champs manquants qui sont requis.",
            });
        }
        const defaultRole = "user";
        const isAdmin = email === "admin@example.com";
        const assignedRole = isAdmin ? "admin" : defaultRole;
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield User_1.default.create({
            email,
            lastname,
            firstname,
            password: hashedPassword,
            pseudo,
            role: assignedRole,
        });
        return res.status(201).json({
            message: "Utilisateur créé avec succès!",
            user: newUser,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Impossible de créer un utilisateur.",
        });
    }
});
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    console.log(req.userId);
    try {
        const user = yield User_1.default.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        const userDetails = {
            id: user.id,
            email: user.email,
            lastname: user.lastname,
            firstname: user.firstname,
            role: user.role,
            pseudo: user.pseudo,
        };
        return res.status(200).json(userDetails);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur lors de la récupération des détails de l'utilisateur",
        });
    }
});
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pseudo, password } = req.body;
        if (!pseudo || !password) {
            return res
                .status(400)
                .json({
                message: "Le nom d'utilisateur et le mot de passe sont requis pour la connexion.",
            });
        }
        const foundUser = yield User_1.default.findOne({
            where: { pseudo },
        });
        if (!foundUser) {
            return res
                .status(401)
                .json({
                message: "Identifiants incorrects. Vérifiez votre nom d'utilisateur et votre mot de passe.",
            });
        }
        const passwordMatch = yield bcrypt.compare(password, foundUser.password);
        if (!passwordMatch) {
            return res
                .status(401)
                .json({
                message: "Identifiants incorrects. Vérifiez votre nom d'utilisateur et votre mot de passe.",
            });
        }
        const token = jwt.sign({ userId: foundUser.id, role: foundUser.role }, "RANDOM_SECRET_KEY", { expiresIn: "24h" });
        return res.status(200).json({
            message: "Connexion réussie!",
            user: foundUser,
            token: token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Impossible de se connecter.",
        });
    }
});
exports.default = {
    signup,
    signin,
    //logout,
    //getAllUsers,
    getUserInfo,
    //updateUserRole,
};
//# sourceMappingURL=userController.js.map
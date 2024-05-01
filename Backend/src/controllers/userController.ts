import { Request, Response } from "express";
import UserModel from "../models/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// add email refus
// promise ? 
const signup = async (req: Request, res: Response): Promise<Response> => {
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Impossible de créer un utilisateur.",
    });
  }
};

const getUserInfo = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.userId;
 console.log(req.userId)
  try {
    const user = await UserModel.findOne({ where: { id:userId }});

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors de la récupération des détails de l'utilisateur",
    });
  }
};



const signin = async (req: Request, res: Response) => {
  try {
    const { pseudo, password } = req.body;

    if (!pseudo || !password) {
      return res
        .status(400)
        .json({
          message:
            "Le nom d'utilisateur et le mot de passe sont requis pour la connexion.",
        });
    }

    const foundUser = await UserModel.findOne({
      where: { pseudo },
    });

    if (!foundUser) {
      return res
        .status(401)
        .json({
          message:
            "Identifiants incorrects. Vérifiez votre nom d'utilisateur et votre mot de passe.",
        });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({
          message:
            "Identifiants incorrects. Vérifiez votre nom d'utilisateur et votre mot de passe.",
        });
    }

    const token = jwt.sign(
      { userId: foundUser.id, role: foundUser.role },
      "RANDOM_SECRET_KEY",
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Connexion réussie!",
      user: foundUser,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Impossible de se connecter.",
    });
  }
};

export default {
  signup,
  signin,
  // logout,
  // getAllUsers,
  getUserInfo,
  //updateUserRole,
};

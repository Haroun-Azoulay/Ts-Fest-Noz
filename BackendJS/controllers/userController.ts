const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { lastname, firstname, password, email, role, pseudo } = req.body;

    if (!lastname || !firstname || !password || !email|| !role || !pseudo) {
      return res
        .status(400)
        .json({
          message:
            "Il y a un des champs manquants qui sont requis.",
        });
    }

    // Role default de l'user
    const defaultRole = "user";

    // Logic to assign administrator role if necessary
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

const signin = async (req, res, next) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res
        .status(400)
        .json({
          message:
            "Le nom d'utilisateur et le mot de passe sont requis pour la connexion.",
        });
    }

    const foundUser = await UserModel.findOne({
      where: { user: user },
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

const logout = (async) => (req, res) => {
  res.status(200).json({ message: "Déconnexion réussie" });
};

function getAllUsers(req, res, next) {
  UserModel.findAll()
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({});
    });
}

function getUserInfo(req, res) {
  const userId = req.user.userId;

  UserModel.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const userDetails = {
        id: user.id,
        user: user.user,
        pseudo: user.pseudo,
        email: user.email,
      };

      return res.status(200).json(userDetails);
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .json({
          message:
            "Erreur lors de la récupération des détails de l'utilisateur",
        });
    });
}

const updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { newRole } = req.body;
    console.log(userId);
    console.log(newRole);

    if (!newRole) {
      return res.status(400).json({ message: "Le nouveau rôle est requis." });
    }

    // Essayez de mettre à jour le rôle
    const updateSuccess = await UserModel.updateUserRole(userId, newRole);
    
    if (updateSuccess) {
      return res.status(200).json({ message: "Rôle mis à jour avec succès." });
    } else {
      return res
        .status(403)
        .json({ message: "Le rôle 'admin' ne peut pas être mis à jour." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Impossible de mettre à jour le rôle de l'utilisateur.",
    });
  }
};

module.exports = {
  signup,
  signin,
  logout,
  getAllUsers,
  getUserInfo,
  updateUserRole,
};

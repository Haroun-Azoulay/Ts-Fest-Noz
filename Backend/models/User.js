/**
 * Import Sequelize.
 */
const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");
const Commentary = require("./Commentary");
const Post = require("./Post");
/**
 * Import the Sequelize instance that you have exported
 * in the config/database.js file.
 */
/**
 * Define a model that can be managed by Sequelize.
 */
class User extends Model {}
// 64 ? a voir clef 
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "artist", "moderator", "user"]],
      },
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: "user", // Provide the name of the table
  }
);


// Méthode pour mettre à jour le rôle de l'utilisateur
User.updateUserRole = async function (userId, newRole) {
  try {
    // Récupérer l'utilisateur par ID
    const user = await this.findByPk(userId);

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Assurez-vous que le nouveau rôle n'est pas "admin"
    if (newRole !== "admin") {
      // Mettez à jour le rôle de l'utilisateur
      await user.update({ role: newRole });
      return true; // La mise à jour a réussi
    } else {
      return false; // Le rôle "admin" ne peut pas être mis à jour
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

User.hasMany(Commentary, { as: 'commentaries' });


module.exports = User;


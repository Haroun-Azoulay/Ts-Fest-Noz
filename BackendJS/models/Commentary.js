const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Commentary extends Model {}

Commentary.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "commentary",
  }
);


module.exports = Commentary;

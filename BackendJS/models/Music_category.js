const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Music_category extends Model {}

Music_category.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "music_category",
  }
);


module.exports = Music_category;

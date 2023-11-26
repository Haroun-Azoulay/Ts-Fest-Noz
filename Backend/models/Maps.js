const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");


class Maps extends Model {}

Maps.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    text: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "maps",
  }
);


module.exports = Maps;

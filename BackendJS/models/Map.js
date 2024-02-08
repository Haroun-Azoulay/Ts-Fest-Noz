const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Event = require("./Event"); 

class Map extends Model {}

Map.init(
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
    modelName: "map",
  }
);

Map.hasOne(Event, { foreignKey: 'map_location', as: 'event' });

module.exports = Map;

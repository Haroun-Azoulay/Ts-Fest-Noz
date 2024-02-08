const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");


class City extends Model {}

City.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    insee_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    city_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    zip_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    departement_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    departement_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    region_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
        allowNull: true,
    },
    region_geojson_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },

  },
  {
    sequelize,
    modelName: "city",
  }
);


module.exports = City;

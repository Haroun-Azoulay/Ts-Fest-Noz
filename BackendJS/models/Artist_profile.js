const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");


class Artist_profile extends Model {}

Artist_profile.init(
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false,
        primaryKey: true,
      },
    denomination: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },
    url_media: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Siret_number: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  },
  {
    sequelize,
    modelName: "artist_profile",
  }
);


module.exports = Artist_profile;

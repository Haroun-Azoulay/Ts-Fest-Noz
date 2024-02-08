const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Event = require("./Event"); 

class Organizer_profil extends Model {}

Organizer_profil.init(
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
    full_adress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    SIRET_number: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    more_info: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  },
  {
    sequelize,
    modelName: "organizer_profile",
  }
);


Organizer_profil.hasMany(Event, { foreignKey: 'welcoming_id', as: 'event' });

module.exports = Organizer_profil;

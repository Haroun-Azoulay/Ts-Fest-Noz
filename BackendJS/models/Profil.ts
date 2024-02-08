import { Sequelize, DataTypes, Model } from "sequelize";

interface ProfilAttributes {
  id: string;
  music_style?: string;
  groupe_name?: string;
  town?: string;
  country?: string;
  userIDd: number;
}

class Profil extends Model<ProfilAttributes> implements ProfilAttributes {
  public id!: string;
  public music_style?: string;
  public groupe_name?: string;
  public town?: string;
  public country?: string;
  public userIDd!: number;
}

Profil.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    music_style: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    groupe_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    town: {
      type: DataTypes.STRING, 
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userIDd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "profil",
  }
);

export default Profil;

//module.exports = Profil;
import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { ArtistProfilAttributes } from "../interfaces/types";
import User from "./User";

class ArtistProfil
  extends Model<ArtistProfilAttributes>
  implements ArtistProfilAttributes
{
  public id!: string;
  public denomination!: string;
  public phone_number!: string;
  public url_media!: string;
  public picture!: string;
  public SIRET_number!: number;
  public userId!: string;
}

ArtistProfil.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    denomination: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    url_media: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    SIRET_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "ArtistProfil",
    tableName: "ArtistProfils",
  },
);

export default ArtistProfil;

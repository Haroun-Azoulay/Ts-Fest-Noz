import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { OrganizerProfilAttributes } from "../interfaces/types";
import User from "./User";

class OrganizerProfil
  extends Model<OrganizerProfilAttributes>
  implements OrganizerProfilAttributes
{
  public id!: string;
  public denomination!: string;
  public phone_number!: string;
  public full_adress!: string;
  public SIRET_number!: number;
  public more_info!: string;
  public userId!: string;
}

OrganizerProfil.init(
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
    full_adress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SIRET_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    more_info: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "OrganizerProfil",
    tableName: "organizerProfils",
  },
);

export default OrganizerProfil;

import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";

interface OrganizerProfilAttributes {
    id: string;
    denomination: string;
    phone_number: string;
    full_adress: string;
    SIRET_number: number;
    more_info: string;
}

class OrganizerProfil extends Model<OrganizerProfilAttributes> implements OrganizerProfilAttributes {
    public id!: string;
    public denomination!: string;
    public phone_number!: string;
    public full_adress!: string;
    public SIRET_number!: number;
    public more_info!: string;
}

OrganizerProfil.init  (
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
          type: DataTypes.STRING,
          allowNull: true,
        },
        more_info: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeConnection,
        modelName: "OrganizerProfil",
      }
)

export default OrganizerProfil;
import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { MapAttributes } from "../interfaces/types";

class Map extends Model<MapAttributes> implements MapAttributes {
  public id!: number;
  // public user_id!: string;
  public longitude?: number;
  public latitude?: number;
  public text?: string;
  public address!: string;
  public color!: string;
}

Map.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    // user_id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: 'users',
    //     key: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
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
    sequelize: sequelizeConnection,
    modelName: "map",
  },
);

// Définir la relation many-to-one avec User
// Map.belongsTo(User, { foreignKey: 'user_id' });

export default Map;

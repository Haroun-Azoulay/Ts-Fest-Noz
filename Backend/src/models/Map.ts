import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
const Event = require("./Event"); 


export type MapAttributes = {
  id: number;
  longitude?: number;
  latitude?: number;
  text?: string;
  address: string;
  color: string;

}


class Map extends Model<MapAttributes> implements MapAttributes {
  id!: number;
  longitude?: number;
  latitude?: number;
  text?: string;
  address!: string;
  color!: string;
}

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
  }
);



export default Map;

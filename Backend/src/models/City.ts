import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";

export type CityAttributes = {
  id: string;
  user_id: number;
  insee_code: number;
  city_name: string;
  text: string;
  address: string;
  zip_code: number;
  label: string;
  longitude: number;
  latitude: number;
  color: string;
  departement_name: string;
  departement_number: number;
  region_name: string;
  region_geo_json: string;
}

class City extends Model<CityAttributes> {
  public id!: string;
  public user_id!: number;
  public insee_code!: number;
  public city_name!: string;
  public address!: string;
  public text!: string;
  public zip_code!: number;
  public label!: string;
  public longitude!: number;
  public latitude!: number;
  public color!: string;
  public departement_name!: string;
  public departement_number!: number;
  public region_name!: string;
  public region_geo_json!: string;
}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: 'Users', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' 
    },
    insee_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city_name: {
      type: DataTypes.STRING,
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
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
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
    region_geo_json: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "city",
  }
);

export default City;

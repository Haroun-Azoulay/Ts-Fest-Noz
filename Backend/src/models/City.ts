import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import User from "./User";

export type CityAttributes = {
  id: string;
  user_id: string;
  city_name: string;
  text: string;
  address: string;
  zip_code: number;
  label: string;
  longitude: number;
  latitude: number;
  date: Date;
  style: string;
  color: string;
  departement_number: number;
  region_name: string;
  url_point: string;
}

class City extends Model<CityAttributes> {
  public id!: string;
  public user_id!: string;
  public city_name!: string;
  public address!: string;
  public text!: string;
  public zip_code!: number;
  public label!: string;
  public longitude!: number;
  public latitude!: number;
  public date!: Date;
  public style!: string;
  public color!: string;
  public departement_number!: number;
  public region_name!: string;
  public url_point!: string;
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
      type: DataTypes.UUID,
      allowNull: false,
      references: { 
        model: 'users', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    style: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
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
    url_point: {
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

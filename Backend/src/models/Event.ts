import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { EventAttributes } from "../interfaces/types";
import City from "./City";
import User from "./User";

class Event extends Model<EventAttributes> implements EventAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public url!: string;
  public mapId!: number;
  public city_id!: string;
  public user_id!: string;
  public price!: string;
}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.UUID,
      references: {
        model: City,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mapId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Event",
    tableName: "events",
  },
);

export default Event;

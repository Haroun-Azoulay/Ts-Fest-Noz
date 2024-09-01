import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { EventAttributes } from "../interfaces/types";
import Payment from "./Payment";

class Event extends Model<EventAttributes> implements EventAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public url!: string;
  public mapId!: number;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: "event",
  }
);

Event.hasMany(Payment, { foreignKey: "payment_id", as: "payment" });
Payment.belongsTo(Event, { foreignKey: 'payment_id' });

export default Event;

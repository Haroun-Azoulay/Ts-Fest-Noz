import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { PaymentAttributes } from "../interfaces/types";
import User from "./User";
import Event from "./Event";

class Payment extends Model<PaymentAttributes> {
  public id!: string;
  public token!: string;
  public payment!: boolean;
  public userId!: string;
  public eventId!: string;
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment: {
      type: DataTypes.BOOLEAN,
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
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Event,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Payment",
    tableName: "payments",
  },
);

export default Payment;

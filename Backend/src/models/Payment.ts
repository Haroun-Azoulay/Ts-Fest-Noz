import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { PaymentAttributes } from "../interfaces/types";
import Event from "./Event";

class Payment extends Model<PaymentAttributes> {
  public id!: string;
  public token!: string;
  public payment!: boolean;
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
    }
  },
  {
    sequelize: sequelizeConnection,
    modelName: "payment",
  }
);

export default Payment;

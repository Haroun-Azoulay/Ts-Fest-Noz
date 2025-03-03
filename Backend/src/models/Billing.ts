import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { BillingAttributes } from "../interfaces/types";
import User from "./User";
import Event from "./Event";

class Billing extends Model<BillingAttributes> implements BillingAttributes {
  public id!: string;
  public userId!: string;
  public eventId!: string;
  public lastname!: string;
  public firstname!: string;
  public address!: string;
  public city!: string;
  public postalCode!: string;
  public price!: string;
}

Billing.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Billing",
    tableName: "billings",
  },
);

export default Billing;

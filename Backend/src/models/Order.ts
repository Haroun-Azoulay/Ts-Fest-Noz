import { Model, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/database";
import OrderDetail from "./OrderDetail";
import User from "./User";

class Order extends Model {
  public id?: string;
  public userId!: string;
  public totalPrice!: number;
  public orderdetailId!: string;
}


Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
    orderDetailId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: OrderDetail,
        key: "id",
      },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Order",
    tableName: "orders",
  }
);

export default Order;

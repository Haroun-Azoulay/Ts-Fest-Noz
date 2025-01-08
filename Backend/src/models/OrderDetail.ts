import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { OrderDetailAttributes } from "../interfaces/types";

class OrderDetail
  extends Model<OrderDetailAttributes>
  implements OrderDetailAttributes
{
  public id?: string | undefined;
  public userId!: string;
  public orderId!: string;
  public goodieId!: string;
  public quantity!: number;
  public price!: number;
}

OrderDetail.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    goodieId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "OrderDetail",
    tableName: "orderdetails",
  }
);

export default OrderDetail;

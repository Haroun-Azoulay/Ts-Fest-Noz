import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/database';
import { OrderAttributes } from "../interfaces/types";
import User from './User';
import OrderDetail from './OrderDetail';

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: string;
  public userId!: string;
  public totalPrice!: number;
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
        model: 'users',
        key: 'id',
      },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    modelName: "order",
  }
);

// Order.hasMany(OrderDetail, { foreignKey: 'orderId', onDelete: 'CASCADE' });
// OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });

export default Order;

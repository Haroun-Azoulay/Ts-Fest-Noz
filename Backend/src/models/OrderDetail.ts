import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/database';
import { OrderDetailAttributes } from "../interfaces/types";
import User from './User';
import Order from './Order';
import Goodie from './Goodie';

class OrderDetail extends Model<OrderDetailAttributes> implements OrderDetailAttributes {
  public id!: string;
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    goodieId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'goodies',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    modelName: "orderdetail",
  }
);

export default OrderDetail;

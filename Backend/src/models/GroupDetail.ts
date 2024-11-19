import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/database';
import { GroupDetailAttributes } from "../interfaces/types";
import User from './User';
import Group from './Group';

class GroupDetail extends Model<GroupDetailAttributes> implements GroupDetailAttributes {
  public id!: string;
  public groupId!: string;
  public userId!: string;
  public owner!: boolean;
}

GroupDetail.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    owner: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "groupdetail",
  }
);

// GroupDetail.belongsTo(Group, { foreignKey: 'groupId' });

export default GroupDetail;

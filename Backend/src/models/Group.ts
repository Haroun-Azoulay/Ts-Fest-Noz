import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/database';
import { GroupAttributes } from "../interfaces/types";

class Group extends Model<GroupAttributes> implements GroupAttributes {
  public id!: string;
  public name!: string;
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "group",
  }
);

// Group.hasMany(Goodie, { foreignKey: 'groupId', onDelete: 'CASCADE' });
// Goodie.belongsTo(Group, { foreignKey: 'groupId' });

// Group.hasMany(GroupDetail, { foreignKey: 'groupId', onDelete: 'CASCADE' });
// GroupDetail.belongsTo(Group, { foreignKey: 'groupId' });

export default Group;

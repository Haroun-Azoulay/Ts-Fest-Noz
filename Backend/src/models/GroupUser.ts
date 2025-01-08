import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { GroupUserAttributes } from "../interfaces/types";
import Group from "./Group";
import User from "./User";

class GroupUser
  extends Model<GroupUserAttributes>
  implements GroupUserAttributes
{
  public id?: string | undefined;
  public groupId?: string | undefined;
  public userId!: string;
}

GroupUser.init(
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
        model: Group,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "GroupUser",
    tableName: "groupeUsers",
  },
);


export default GroupUser;

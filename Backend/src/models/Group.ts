import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { GroupAttributes } from "../interfaces/types";

class Group extends Model<GroupAttributes> implements GroupAttributes {
  public id?: string | undefined;
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
    tableName: "groups",
  },
);

export default Group;

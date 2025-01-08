import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { CommentaryAttributes } from "../interfaces/types";
import Post from "./Post";
import User from "./User";

class Commentary
  extends Model<CommentaryAttributes>
  implements CommentaryAttributes
{
  public id!: string;
  public content!: string;
  public postId!: string;
  public userId!: string;
}

Commentary.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Post,
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
    modelName: "Commentary",
    tableName: "commentaries",
  },
);

export default Commentary;

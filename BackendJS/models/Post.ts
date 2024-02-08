import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface PostAttributes {
  id: string;
  title: string;
  subtitle: string;
  content:string;
}

class Post extends Model<PostAttributes> implements PostAttributes {
  public id!: string;
  public title!: string;
  public subtitle!: string;
  public content!: string;
}

Post.init(
  {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false,
        primaryKey: true,
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "post",
  }
);

module.exports = Post;

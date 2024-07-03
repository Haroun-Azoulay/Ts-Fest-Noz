import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/database';
import User from './User';
import Commentary from './Commentary';

export interface PostAttributes {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  userId: string;
}

class Post extends Model<PostAttributes> implements PostAttributes {
  public id!: string;
  public title!: string;
  public subtitle!: string;
  public content!: string;
  public userId!: string;
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "post",
  }
);

Post.hasMany(Commentary, { foreignKey: 'postId' });
export default Post;

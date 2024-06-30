import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/database';
import Post from './Post'; 

export interface CommentaryAttributes {
  id: string;
  content: string;
  postId: string;
}

class Commentary extends Model<CommentaryAttributes> implements CommentaryAttributes {
  public id!: string;
  public content!: string;
  public postId!: string;
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
        key: 'id',
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "commentary",
  }
);

export default Commentary;

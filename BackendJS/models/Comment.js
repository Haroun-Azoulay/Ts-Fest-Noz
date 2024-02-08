const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");


class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false,
        primaryKey: true,
      },
  },
  {
    sequelize,
    modelName: "comment",
  }
);


module.exports = Comment;

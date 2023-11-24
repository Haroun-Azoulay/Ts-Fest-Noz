const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Commentary = require("./Commentary");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "post",
  }
);

Post.hasMany(Commentary, { as: 'test' });

module.exports = Post;

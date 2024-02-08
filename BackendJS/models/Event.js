const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Comment = require("./Comment"); 

class Event extends Model {}

Event.init(
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },
  },
  {
    sequelize,
    modelName: "event",
  }
);

Event.hasOne(Comment, { foreignKey: 'event_id', as: 'comment' });
module.exports = Event;

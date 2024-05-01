import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Comment from "./Comment";

interface EventAttributes {
  id: string;
  name: string | null;
  description: string | null;
}

interface EventCreationAttributes extends Optional<EventAttributes, "id"> {}

class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: string;
  public name!: string | null;
  public description!: string | null;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
      type: DataTypes.STRING, // Changed from INTEGER to STRING
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "event",
  }
);

// Event.hasOne(Comment, { foreignKey: 'event_id', as: 'comment' });

export default Event;

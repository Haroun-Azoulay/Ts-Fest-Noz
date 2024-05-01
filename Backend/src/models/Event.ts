import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import Map from "./Map"; // Importez le modèle Map

interface EventAttributes {
  id: string;
  name: string;
  description: string;
  url: string;
  mapId: number; // Ajoutez une clé étrangère pour la relation One-to-One
}

class Event extends Model<EventAttributes> implements EventAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public url!: string;
  public mapId!: number; // Ajoutez une clé étrangère pour la relation One-to-One
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mapId: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "event",
  }
);

// Event.belongsTo(Map, { foreignKey: 'mapId', as: 'map' });

export default Event;

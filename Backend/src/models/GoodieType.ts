import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { GoodieTypeAttributes } from "../interfaces/types";
import Goodie from "./Goodie";

class GoodieType
  extends Model<GoodieTypeAttributes>
  implements GoodieTypeAttributes
{
  id?: string | undefined;
  name!: string;
}

GoodieType.init(
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
    modelName: "goodietype",
  },
);

// GoodieType.hasMany(Goodie, { foreignKey: 'goodieTypeId', onDelete: 'CASCADE' });
// Goodie.belongsTo(GoodieType, { foreignKey: 'goodieTypeId' });

export default GoodieType;

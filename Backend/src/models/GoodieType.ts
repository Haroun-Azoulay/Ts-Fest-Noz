import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { GoodieTypeAttributes } from "../interfaces/types";

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
    modelName: "goodieType",
    tableName: "goodieTypes",
  },
);

export default GoodieType;

import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { GoodieAttributes } from "../interfaces/types";
import User from "./User";
import Group from "./Group";
import GoodieType from "./GoodieType";

class Goodie extends Model<GoodieAttributes> implements GoodieAttributes {
  id?: string | undefined;
  groupId!: string;
  userId!: string;
  goodieTypeId?: string;
  name!: string;
  path?: string;
  quantity!: number;
  price!: number;
  available!: boolean;
}

Goodie.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Group,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    goodieTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: GoodieType,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "goodie",
    tableName: "goodies",
  },
);

export default Goodie;

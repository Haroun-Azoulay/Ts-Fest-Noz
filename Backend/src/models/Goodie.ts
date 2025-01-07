import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { GoodieAttributes } from "../interfaces/types";

class Goodie extends Model<GoodieAttributes> implements GoodieAttributes {
  id?: string | undefined;
  groupId!: string;
  userId!: string;
  goodieTypeId!: string;
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
        model: "groups",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    goodieTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "goodietypes",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    path: {
      type: DataTypes.BLOB,
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
  },
);

export default Goodie;

import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { UserAttributes } from "../interfaces/types";

class User extends Model<UserAttributes> {
  public id!: string;
  public lastname!: string;
  public firstname!: string;
  public password!: string;
  public email!: string;
  public city!: string;
  public longitude!: number;
  public latitude!: number;
  public role!: string;
  public pseudo!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "artist", "organizer", "user"]],
      },
    },
    pseudo: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "User",
    tableName: "users",
  },
);

export default User;

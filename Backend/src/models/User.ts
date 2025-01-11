import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import { UserAttributes } from "../interfaces/types";

class User extends Model<UserAttributes> {
  public id!: string;
  public lastname!: string;
  public firstname!: string;
  public password!: string;
  public email!: string;
  public role!: string;
  public pseudo!: string;

  public static updateUserRole = async (
    userId: string,
    newRole: string,
  ): Promise<boolean> => {
    try {
      const user = await this.findByPk(userId);
      if (!user) {
        throw new Error("User not found.");
      }
      if (newRole !== "admin") {
        await user.update({ role: newRole });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
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
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "artist", "organizer", "user"]],
      },
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "User",
    tableName: "users",
  },
);

export default User;

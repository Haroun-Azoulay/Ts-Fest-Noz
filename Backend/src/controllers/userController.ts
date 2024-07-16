import { Request, Response } from "express";
import UserModel from "../models/User";
import { UserInfo } from "../interfaces/types";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const { lastname, firstname, password, email, role, pseudo } = req.body;

    if (!lastname || !firstname || !password || !email || !role || !pseudo) {
      return res.status(400).json({
        message: "A required field is missing.",
      });
    }

    const defaultRole : string = "user";
    const isAdmin : boolean = email === "admin@example.com";
    const assignedRole : string = isAdmin ? "admin" : defaultRole;
    const hashedPassword : string = await bcrypt.hash(password, 10);

    const newUser : UserModel = await UserModel.create({
      email,
      lastname,
      firstname,
      password: hashedPassword,
      pseudo,
      role: assignedRole,
    });

    return res.status(201).json({
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to create user.",
    });
  }
};

const getUserInfo = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  const userId : string | undefined = req.userId;
  console.log(req.userId)
  try {

    const user : UserModel | null = await UserModel.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const userDetails : UserInfo = {
      id: user.id,
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
      role: user.role,
      pseudo: user.pseudo
    };

    return res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error retrieving user details",
    });
  }
};

const signin = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const pseudo : string = req.body.pseudo;
    const password : string = req.body.password;

    if (!pseudo || !password) {
      return res
        .status(400)
        .json({
          message: "Username and password are required for login.",
        });
    }

    const foundUser : UserModel | null = await UserModel.findOne({
      where: { pseudo },
    });

    if (!foundUser) {
      return res
        .status(401)
        .json({
          message: "Invalid credentials. Check your username and password.",
        });
    }

    const passwordMatch : string = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({
          message: "Invalid credentials. Check your username and password.",
        });
    }

    const token : string = jwt.sign(
      { userId: foundUser.id, role: foundUser.role },
      "RANDOM_SECRET_KEY",
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful!",
      user: foundUser,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to login.",
    });
  }
};

const logout = async (req: Request, res: Response) : Promise<void> => {
  res.status(200).json({ message: "Logout successful" });
};

const getAllUsers = async(req: Request, res: Response) : Promise<void> => {
  UserModel.findAll()
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({});
    });
}

const updateUserRole = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const userId : string = req.params.userId;
    const newRole : string = req.body.newRole;
    console.log(userId);
    console.log(newRole);

    if (!newRole) {
      return res.status(400).json({ message: "New role is required." });
    }

    const updateSuccess : boolean = await UserModel.updateUserRole(userId, newRole);
    
    if (updateSuccess) {
      return res.status(200).json({ message: "Role updated successfully." });
    } else {
      return res
        .status(403)
        .json({ message: "Admin role cannot be updated." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to update user role.",
    });
  }
};

export default {
  signup,
  signin,
  logout,
  getAllUsers,
  getUserInfo,
  updateUserRole,
};

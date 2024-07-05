import { Request, Response } from "express";
import UserModel from "../models/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { lastname, firstname, password, email, role, pseudo } = req.body;

    if (!lastname || !firstname || !password || !email || !role || !pseudo) {
      return res.status(400).json({
        message: "A required field is missing.",
      });
    }

    const defaultRole = "user";
    const isAdmin = email === "admin@example.com";
    const assignedRole = isAdmin ? "admin" : defaultRole;


    const hashedPassword = await bcrypt.hash(password, 10);

 
    const newUser = await UserModel.create({
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

const getUserInfo = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.userId;
  console.log(req.userId)
  try {

    const user = await UserModel.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    const userDetails = {
      id: user.id,
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
      role: user.role,
      pseudo: user.pseudo,
    };

    return res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error retrieving user details",
    });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { pseudo, password } = req.body;


    if (!pseudo || !password) {
      return res
        .status(400)
        .json({
          message: "Username and password are required for login.",
        });
    }

    const foundUser = await UserModel.findOne({
      where: { pseudo },
    });

    if (!foundUser) {
      return res
        .status(401)
        .json({
          message: "Invalid credentials. Check your username and password.",
        });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({
          message: "Invalid credentials. Check your username and password.",
        });
    }

    const token = jwt.sign(
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

const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout successful" });
};

function getAllUsers(req: Request, res: Response) {
  UserModel.findAll()
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({});
    });
}

const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { newRole } = req.body;
    console.log(userId);
    console.log(newRole);


    if (!newRole) {
      return res.status(400).json({ message: "New role is required." });
    }


    const updateSuccess = await UserModel.updateUserRole(userId, newRole);
    
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

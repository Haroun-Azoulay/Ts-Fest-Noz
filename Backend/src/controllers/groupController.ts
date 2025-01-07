import { Request, Response } from "express";
import UserModel from "../models/User";
import GroupModel from "../models/Group";

const createGroup = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const userId: string | undefined = req.userId;
  try {
    const groupName = req.body.name;
    const user: UserModel | null = await UserModel.findOne({
      where: { id: userId },
    });
    const checkExistGroup: GroupModel | null = await GroupModel.findOne({
      where: { name: groupName },
    });

    if (!user && !(user!.role === "admin")) {
      return res
        .status(403)
        .json({ message: "Impossible to create a group. Your are not admin" });
    }
    if (checkExistGroup) {
      return res.status(409).json({
        message: "Unable to create a group because the name already exists",
      });
    }
    const newGroup: GroupModel = await GroupModel.create({
      name: groupName,
    });
    return res.json({ newGroup });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating a group." });
  }
};

const deleteGroup = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const userId: string | undefined = req.userId;
  const groupId: string = req.params.id;
  try {
    const user: UserModel | null = await UserModel.findOne({
      where: { id: userId },
    });
    const checkExistGroup: GroupModel | null = await GroupModel.findOne({
      where: { id: groupId },
    });

    if (!user && !(user!.role === "admin") && !checkExistGroup) {
      return res.status(404).json({ message: "Unable to delete a group." });
    }

    await GroupModel.destroy({ where: { id: groupId } });

    return res.json({ message: "The group are deleted !" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting a group." });
  }
};

const getGroup = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const groupId: string | undefined = req.params.id;
    if (!groupId) {
      return res.status(400).json({ message: "Group ID is required" });
    }

    const group: GroupModel | null = await GroupModel.findOne({
      where: { id: groupId },
    });
    return res.json(group);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting the group." });
  }
};

const getAllGroups = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const allGroups: GroupModel[] = await GroupModel.findAll();
    return res.json(allGroups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting all groups." });
  }
};

export default {
  createGroup,
  deleteGroup,
  getGroup,
  getAllGroups,
};

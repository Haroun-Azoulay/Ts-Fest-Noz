import { Request, Response } from "express";
import UserModel from "../models/User";
import GroupModel from "../models/Group";
import { Sequelize } from "sequelize";

const createGroup = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const groupName = req.body.name;
    if (!groupName) {
      throw new Error("No group name been sent.")
    }
    const checkExistGroup: GroupModel | null = await GroupModel.findOne({
      where: { name: groupName },
    });
    if (checkExistGroup) {
      return res.status(409).json({
        message: "Unable to create a group because the name already exists",
      });
    }
    const newGroup: GroupModel = await GroupModel.create({
      name: groupName,
    });
    return res.status(201).json({ newGroup });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating a group." });
  }
};

const deleteGroup = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const groupId: string = req.params.id;
    const checkExistGroup: GroupModel | null = await GroupModel.findOne({
      where: { id: groupId },
    });
    if (!checkExistGroup) {
      return res.status(404).json({
        message: "Unable to find the group.",
      });
    }
    await GroupModel.destroy({ where: { id: groupId } });
    return res.status(200).json({ message: "The group is deleted !" });
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
    const group: GroupModel | null = await GroupModel.findOne({
      where: { id: groupId },
    });
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }
    return res.status(200).json(group);
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
    return res.status(200).json(allGroups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting all groups." });
  }
};

const getRandomGroups = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<any, any>>> => {
  try {
    const randomGroups: GroupModel[] = await GroupModel.findAll({
      order: Sequelize.literal("RANDOM()"),
      limit: 5,
    });
    return res.json(randomGroups);
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
  getRandomGroups,
};

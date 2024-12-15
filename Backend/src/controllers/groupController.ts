import { Request, Response } from "express";
import UserModel from "../models/User";
import GroupModel from "../models/Group";
import GroupDetailModel from "../models/GroupDetail";

const createGroup = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const userId: string | undefined = req.userId;
  try {
    const groupName = req.body.name;
    const groupEmailMembers: string[] = req.body.members;
    const user: UserModel | null = await UserModel.findOne({
      where: { id: userId },
    });
    const userAlreadyInGroup: GroupDetailModel | null =
      await GroupDetailModel.findOne({ where: { userId: userId } });
    const checkExistGroup: GroupModel | null = await GroupModel.findOne({
      where: { name: groupName },
    });

    if (
      !user &&
      !(user!.role === "artist") &&
      userAlreadyInGroup &&
      checkExistGroup
    ) {
      return res
        .status(404)
        .json({ message: "Impossible de créer un groupe." });
    }
    const newGroup: GroupModel = await GroupModel.create({
      name: groupName,
    });
    await GroupDetailModel.create({
      userId: user?.id,
      groupId: newGroup?.id,
      owner: true,
    });
    for (const element of groupEmailMembers) {
      const getUser: UserModel | null = await UserModel.findOne({
        where: { email: element, role: "artist" },
      });
      if (getUser == null) {
        await GroupModel.destroy({ where: { id: newGroup?.id } });
        throw new TypeError("User not found!");
      }
      await GroupDetailModel.create({
        userId: getUser?.id,
        groupId: newGroup?.id,
        owner: false,
      });
    }
    return res.json({ message: "Le groupe a été crée !" });
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
    const userAlreadyInGroup: GroupDetailModel | null =
      await GroupDetailModel.findOne({
        where: { userId: userId, owner: true },
      });
    const checkExistGroup: GroupModel | null = await GroupModel.findOne({
      where: { id: groupId },
    });

    if (
      !user &&
      !(user!.role === "artist") &&
      !userAlreadyInGroup &&
      !checkExistGroup
    ) {
      return res
        .status(404)
        .json({ message: "Impossible de supprimer un groupe." });
    }

    await GroupModel.destroy({ where: { id: groupId } });

    return res.json({ message: "Le groupe a été supprimé !" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting a group." });
  }
};

const getGroup = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const userId: string | undefined = req.userId;
  try {
    const user: UserModel | null = await UserModel.findOne({
      where: { id: userId },
    });
    const getGroupDetail: GroupDetailModel | null =
      await GroupDetailModel.findOne({ where: { userId: userId } });
    if (!user && !getGroupDetail) {
      return res
        .status(404)
        .json({ message: "Impossible de recevoir le groupe." });
    }
    const group: GroupModel | null = await GroupModel.findOne({
      where: { id: getGroupDetail?.groupId },
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
  const userId: string | undefined = req.userId;
  try {
    const user: UserModel | null = await UserModel.findOne({
      where: { id: userId },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Impossible de recevoir la liste des groupes." });
    }
    const allGroups = await GroupModel.findAll();
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

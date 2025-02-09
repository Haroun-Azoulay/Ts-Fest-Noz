import { Request, Response } from "express";
import UserModel from "../models/User";
import GroupUserModel from "../models/GroupUser";
import { GroupUsersDetailInfo } from "../interfaces/types";

const createGroupUser = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const { groupId } = req.params;
  const { userId } = req.body;

  try {
    const user = await UserModel.findOne({
      where: { id: userId },
    });
    if (user?.role === "artist") {
      const groupUser = await GroupUserModel.create({
        groupId,
        userId,
      });
      return res.status(201).json({
        message: "User added to group successfully",
        data: groupUser,
      });
    }
    return res.status(401).json({
      message: "User not an artist.",
    });
  } catch (error) {
    console.error("Error when adding a user to the group :", error);
    return res.status(500).json({
      message: "An error occurred while adding user to group",
    });
  }
};

const deleteGroupUser = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const { groupId } = req.params;
  const { userId } = req.body;
  try {
    const groupUser: GroupUserModel | null = await GroupUserModel.findOne({
      where: {
        groupId: groupId,
        userId: userId,
      },
    });
    if (!groupUser) {
      return res.status(404).json({ message: "Group User not found." });
    }
    const removeGroupUser = await GroupUserModel.destroy({
      where: {
        groupId: groupId,
        userId: userId,
      },
    });
    return res.status(200).json({
      message: "User removed successfully.",
      data: removeGroupUser,
    });
  } catch (error) {
    console.error("Error when removing a user", error);
    return res.status(500).json({
      message: "An error occurred while removing user from group.",
    });
  }
};

export default {
  createGroupUser,
  deleteGroupUser,
};

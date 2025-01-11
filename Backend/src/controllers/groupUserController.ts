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
    const groupeUser = await GroupUserModel.create({
      groupId,
      userId,
    });

    return res.status(201).json({
      message: "User added to group successfully",
      data: groupeUser,
    });
  } catch (error) {
    console.error("Error when adding a post:", error);
    return res.status(500).json({
      message: "An error occurred while adding user to group",
    });
  }
};

export default {
  createGroupUser,
};

import { Request, Response } from "express";
import UserModel from "../models/User";
import GroupUserModel from "../models/GroupUser";
import { GroupUsersDetailInfo } from "../interfaces/types";

const getMyGroup = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const userId: string | undefined = req.userId;
  try {
    const user: UserModel | null = await UserModel.findOne({
      where: { id: userId },
    });
    const userAlreadyInGroup: GroupUserModel | null =
      await GroupUserModel.findOne({ where: { userId: userId } });
    if (!user && !(user!.role === "artist") && !userAlreadyInGroup) {
      return res.status(404).json({
        message:
          "Impossible de récupérer les données de l'utilisateur dans un groupe.",
      });
    }
    const groupDetails: GroupUserModel[] | null =
      await GroupUserModel.findAll({
        where: { groupId: userAlreadyInGroup?.groupId },
      });
    const groupUsersDetailInfoList: GroupUsersDetailInfo[] | null = [];
    for (const element of groupDetails) {
      const getUser: UserModel | null = await UserModel.findOne({
        where: { id: element.userId },
      });
      const groupUsersDetailInfo: GroupUsersDetailInfo | null = {
        id: element.id,
        groupId: element.groupId,
        userId: element.userId,
        email: getUser?.email,
      };
      groupUsersDetailInfoList.push(groupUsersDetailInfo);
    }
    return res.json(
      groupUsersDetailInfoList
        ? groupUsersDetailInfoList
        : { message: "L'utilisateur n'a pas de groupe." },
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error getting group of the user." });
  }
};

export default {
  getMyGroup,
};

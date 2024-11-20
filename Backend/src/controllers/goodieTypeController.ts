import { Request, Response } from "express";
import UserModel from "../models/User";
import GoodieTypeModel from "../models/GoodieType";
import { GoodieTypeAttributes } from "../interfaces/types";

const getAllGoodieTypes = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    const userId : string | undefined = req.userId;
    try {
        const user : UserModel | null = await UserModel.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const allGoodieTypes : GoodieTypeModel[] | undefined = await GoodieTypeModel.findAll();
        return res.json(allGoodieTypes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving goodie types" });
    }
};

export default {
    getAllGoodieTypes,
}
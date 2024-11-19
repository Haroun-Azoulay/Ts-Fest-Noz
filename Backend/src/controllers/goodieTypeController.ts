import { Request, Response } from "express";
import GoodieTypeModel from "../models/GoodieType";
import { GoodieTypeAttributes } from "../interfaces/types";

const getAllGoodieTypes = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    try {
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
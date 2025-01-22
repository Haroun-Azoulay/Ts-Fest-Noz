import { Request, Response } from "express";
import GoodieTypeModel from "../models/GoodieType";
import { GoodieTypeAttributes } from "../interfaces/types";

const addgoodieType = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const goodieType: GoodieTypeAttributes = await GoodieTypeModel.create({
      ...req.body,
    });
    return res.status(201).json({
      id: goodieType.id,
      name: goodieType.name,
    });
  } catch (error) {
    console.error("Error adding an goodie type:", error);
    return res.status(500).send("Error adding goodie type");
  }
};

const getGoodieType = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const goodieTypeId : string = req.params.goodieTypeId;
    const goodieType : GoodieTypeModel | null = await GoodieTypeModel.findByPk(goodieTypeId);
    if (!goodieType) {
      return res.status(404).json({ message: "Goodie Type doesn't exist."});
    }
    return res.status(200).json(goodieType);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving goodie type" });
  }
};


const getAllgoodieType = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const allgoodieType: GoodieTypeModel[] | undefined =
      await GoodieTypeModel.findAll();
    return res.status(200).json(allgoodieType);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving goodie type" });
  }
};

const deletegoodieType = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const goodieTypeId: string = req.params.id;
    const goodieType = await GoodieTypeModel.findByPk(goodieTypeId);
    if (!goodieType) {
      return res.status(404).json({ message: "The goodie Type don't exist." });
    }
    await goodieType.destroy();
    return res.status(200).json({ message: "Goodie Type removed success." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error to remove goodie type." });
  }
};

export default {
  addgoodieType,
  getGoodieType,
  getAllgoodieType,
  deletegoodieType,
};

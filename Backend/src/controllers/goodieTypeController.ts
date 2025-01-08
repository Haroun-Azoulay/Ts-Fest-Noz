import { Request, Response } from "express";
import GoodieTypeModel from "../models/GoodieType";
import { GoodieTypeAttributes } from "../interfaces/types";

const addGoodieTypes = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const role: string | undefined = req.role;
    const goodieTypes: GoodieTypeAttributes = await GoodieTypeModel.create({
      ...req.body,
    });

    const formattedGoodieType = {
      id: goodieTypes.id,
      name: goodieTypes.name,
    };

    return res.status(201).json(formattedGoodieType);
  } catch (error) {
    console.error("Error adding an goodie type:", error);
    return res.status(500).send("Error adding goodie type");
  }
};

const getAllGoodieTypes = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const allGoodieTypes: GoodieTypeModel[] | undefined =
      await GoodieTypeModel.findAll();
    return res.json(allGoodieTypes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving goodie types" });
  }
};

const deleteGoodieTypes = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const goodieTypesId: string = req.params.id;
    const goodieTypes = await GoodieTypeModel.findByPk(goodieTypesId);
    if (!goodieTypes) {
      return res.status(404).json({ message: "The goodie Types don't exist." });
    }
    await goodieTypes.destroy();
    return res.status(204).json({ message: "Goodie Types removed success." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error to remove goodie types." });
  }
};

export default {
  addGoodieTypes,
  getAllGoodieTypes,
  deleteGoodieTypes,
};

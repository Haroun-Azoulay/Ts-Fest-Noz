import { Request, Response } from "express";
import GoodieModel from "../models/Goodie";
import fs from "fs";
import { GoodieAttributes } from "../interfaces/types";

interface MulterRequest extends Request {
  file: any;
}

const createGoodie = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const file = (req as MulterRequest).file;

  if (!file) {
    console.log("Aucun fichier reçu !");
    return res.status(400).json({ message: "Aucun fichier fourni" });
  }

  console.log("Chemin du fichier :", file.path);
  console.log("Nom original :", file.originalname);
  console.log("MIME type :", file.mimetype);
  console.log("Taille du fichier :", file.size);

  if (file === undefined) {
    return res.status(201).json("Not found");
  }
  const readimagem = fs.readFileSync(`public/images/${file.originalname}`);
  const imagemBase64 = Buffer.from(readimagem).toString("base64");

  try {
    console.log("oui");
    const goodie: GoodieModel = await GoodieModel.create({
      ...req.body,
      path: "/images/" + file.originalname,
    });
    console.log("non");
    const formattedGoodie: GoodieAttributes = {
      id: goodie.id,
      groupId: goodie.groupId,
      userId: goodie.userId,
      goodieTypeId: goodie.goodieTypeId,
      name: goodie.name,
      path: imagemBase64,
      quantity: goodie.quantity,
      price: goodie.price,
      available: goodie.available,
    };

    // console.log("Base64 Image Path:", imagemBase64);
    // console.log("addPost:", formattedGoodie);
    return res.status(201).json(formattedGoodie);
  } catch (error) {
    return res.status(500).json({ message: "Error with creation goodie." });
  }
};

const getAllAvailableGoodies = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const allGoodies: GoodieModel[] = await GoodieModel.findAll({
      where: { available: true },
    });
    return res.status(200).json(allGoodies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to retrieve available goodie.",
    });
  }
};

const getGoodie = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const goodieId: string = req.params.id;
    const goodie : GoodieModel | null = await GoodieModel.findOne({
      where: { id: goodieId },
    });
    if (!goodie) {
      return res.status(404).json({ message: "Goodie does not exist."});
    }
    return res.status(200).json(goodie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to retrieve your goodies",
    });
  }
};

const getMyGoodies = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId: string = req.params.id;
    const myGoodies: GoodieModel[] = await GoodieModel.findAll({
      where: { userId: userId },
    });
    return res.status(200).json(myGoodies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to retrieve your goodies",
    });
  }
};

const getFilteredGoodies = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const selectedGroup: string = req.query.selectedGroup as string;
    const selectedType: string = req.query.selectedType as string;
    var filteredGoodies: GoodieModel[] | undefined = undefined;

    if (selectedGroup !== undefined && selectedType !== undefined) {
      filteredGoodies = await GoodieModel.findAll({
        where: {
          available: true,
          groupId: selectedGroup,
          goodieTypeId: selectedType,
        },
      });
    } else if (selectedGroup === undefined) {
      filteredGoodies = await GoodieModel.findAll({
        where: { available: true, goodieTypeId: selectedType },
      });
    } else {
      filteredGoodies = await GoodieModel.findAll({
        where: { available: true, groupId: selectedGroup },
      });
    }
    return res.status(200).json(filteredGoodies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "Erreur lors de la récupération de la liste filtrée des goodies.",
    });
  }
};

export default {
  createGoodie,
  getGoodie,
  getAllAvailableGoodies,
  getMyGoodies,
  getFilteredGoodies,
};

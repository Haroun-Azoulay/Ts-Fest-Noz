import { Request, Response } from 'express';
import UserModel from '../models/User';
import GoodieModel from '../models/Goodie';
import GroupDetailModel from '../models/GroupDetail';
import fs from 'fs';
var path = require('path');
var multer = require('multer');

const createGoodie = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  const timestamp = Date.now();
  const userId : string | undefined = req.userId;
  var extension = '';
  try {
    const user : UserModel | null = await UserModel.findOne({ where: { id: userId } });
    if (!user && !(user!.role === "artist")) {
      return res.status(401).json({ message: "Impossible de créer un goodie." });
    }
    const storage = multer.diskStorage({
      destination: (req: any, file: any, cb: any) => {
        const uploadDir = path.join(__dirname, '../public', userId);
        console.log(`Chemin cible : ${uploadDir}`);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (req: any, file:any, cb:any) => {
        extension = file.originalname.split('.').pop();
        cb(null, `${timestamp}.${extension}`);
      },
    });
    
    var upload = multer({
      storage: storage
    });
    
    upload.single('goodieImage')(req, res, async (err:any) => {
      if (err) {
        return res.status(500).json({ message: 'File upload failed', error: err.message });
      }
  
      const { goodieName, goodieTypeId, goodiePrice, goodieQuantity, goodieAvailable } = req.body;
      const userId : string | undefined = req.userId;
      const groupDetail : GroupDetailModel | null = await GroupDetailModel.findOne({ where: { userId: userId } });
      const groupId = groupDetail?.groupId;
      
      const newGoodie : GoodieModel = await GoodieModel.create({
          userId: userId,
          groupId: groupId,
          name: goodieName,
          goodieTypeId: goodieTypeId,
          price: goodiePrice,
          quantity: goodieQuantity,
          available: goodieAvailable,
          path: `localhost:3000/${userId}/${timestamp}.${extension}`
      });
    });
    return res.status(201).json({ message: 'Le goodie a été créé !'});
  } catch (error) {
    console.error(error);
    var filePathToDelete = `../public/${userId}/${timestamp}.${extension}`; 
    if (fs.existsSync(filePathToDelete)) {
      fs.unlinkSync(filePathToDelete);
    }
    return res.status(500).json({ message: "Erreur lors de la création d'un goodie." });
  }
}

const getAllAvailableGoodies = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const userId : string | undefined = req.userId;
    const user : UserModel | null = await UserModel.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ message: "Impossible de récupérer la liste des goodies." });
    }
    const allGoodies : GoodieModel[] = await GoodieModel.findAll({where: {available: true}});
    return res.status(200).json(allGoodies);
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: "Erreur lors de la récupération de la liste des goodies." });
  }
}

const getMyGoodies = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const userId : string | undefined = req.userId;
    const user : UserModel | null = await UserModel.findOne({ where: { id: userId } });
    if (!user && !(user!.role === "artist")) {
      return res.status(401).json({ message: "Impossible de récupérer la liste de vos goodies." });
    }
    const myGoodies : GoodieModel[] = await GoodieModel.findAll({where: {userId: userId}});
    return res.status(200).json(myGoodies);
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: "Erreur lors de la récupération de la liste de vos goodies." });
  }
}
const getFilteredGoodies = async (req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
  try {
    const userId : string | undefined = req.userId;
    const user : UserModel | null = await UserModel.findOne({ where: { id: userId } });
    const selectedGroup : string = req.query.selectedGroup as string;
    const selectedType : string = req.query.selectedType as string;
    var filteredGoodies : GoodieModel[] | undefined = undefined;
    if (!user) {
      return res.status(401).json({ message: "Impossible de récupérer la liste filtrée des goodies." });
    }
    console.log(selectedGroup);
    console.log(selectedType);
    if (selectedGroup !== "null" && selectedType !== "null") {
      filteredGoodies = await GoodieModel.findAll({where: {available: true, groupId: selectedGroup, goodieTypeId: selectedType}});
    } else if (selectedGroup === "null") {
      filteredGoodies = await GoodieModel.findAll({where: {available: true, goodieTypeId: selectedType}});
    } else {
      filteredGoodies = await GoodieModel.findAll({where: {available: true, groupId: selectedGroup}});
    }
    return res.status(200).json(filteredGoodies);
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: "Erreur lors de la récupération de la liste filtrée des goodies." });
  }
}

export default {
  createGoodie,
  getAllAvailableGoodies,
  getMyGoodies,
  getFilteredGoodies
};

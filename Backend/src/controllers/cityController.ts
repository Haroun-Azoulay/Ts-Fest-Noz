import CityModel from "../models/City";
import { Request, Response } from "express";

const addPoint = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "L'utilisateur doit être authentifié." });
    }

    const point = await CityModel.create({
      ...req.body,
      user_id: userId
    });

    const formattedPoint = {
      id: point.id,
      longitude: point.longitude,
      latitude: point.latitude,
      date: point.date,
      text: point.text,
      address: point.address,
      insee_code: point.insee_code,
      city_name: point.city_name,
      zip_code: point.zip_code,
      label: point.label,
      color: point.color,
      style: point.style,
      departement_name: point.departement_name,
      departement_number: point.departement_number,
      region_name: point.region_name,
      region_geo_json: point.region_geo_json,
    };

    res.status(201).json(formattedPoint);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un point :", error);
    res.status(500).send("Erreur lors de l'ajout d'un point");
  }
};
const getAllPoints = async (req: Request, res: Response) => {
    try {

        const points = await CityModel.findAll();
  

      // const pointsWithUserDetails = await Promise.all(points.map(async (point) => {
      //   //const user = await UserModel.findByPk(point.userId, { attributes: ["id", "pseudo"] });
      //   return {
      //     id: point.id,
      //     address: point.address,
      //     longitude: point.longitude, // Assurez-vous d'ajouter ces propriétés si elles existent
      //     latitude: point.latitude,
      //     text: point.text,
      // };
      // }));
  
      return res.json(points);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors de la récupération des points." });
    }
};
const getPointByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "L'ID de l'utilisateur est requis." });
        }

        const points = await CityModel.findAll({
            where: {
                user_id: userId
            }
        });

        // const simplifiedPoints = points.map(point => ({
        //     id: point.id,
        //     address: point.address,
        // }));

        return res.json(points);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la récupération des points par utilisateur." });
    }
};


// const updatePoint = async (req: Request, res: Response) => {
//     try {
//         const { pointId } = req.params; 
//         const userId = req.userId; 

//         // Effectuer la mise à jour
//         const [updatedRows] = await CityModel.update(
//             { ...req.body, user_id: userId }, // Mettre à jour les champs avec les données de req.body
//         //     { where: { id: pointId, user_id: userId } } // Condition pour s'assurer que le point appartient à l'utilisateur
//         // );

//         // if (updatedRows === 0) {
//         //     return res.status(404).json({ message: "Point non trouvé ou vous n'avez pas la permission de le mettre à jour." });
//         // }

//         // Récupérer l'instance mise à jour pour la renvoyer
//         const updatedPoint = await CityModel.findOne({ where: { id: pointId } });

//         if (!updatedPoint) {
//             return res.status(404).json({ message: "Point mis à jour non trouvé." });
//         }

//         res.status(200).json(updatedPoint); // Renvoyer l'instance mise à jour
//     } catch (error) {
//         console.error("Erreur lors de la mise à jour du point :", error);
//         res.status(500).send("Erreur lors de la mise à jour du point.");
//     }
// };


const deletePoint = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    // const isAdmin = req.isAdmin;
    const { pointId } = req.params;

    const point = await CityModel.findByPk(pointId);
    if (!point) {
      return res.status(404).json({ message: "Le point n'existe pas." });
    }

    if (point.user_id !== userId) {
      return res.status(403).json({ message: "Vous n'avez pas la permission de supprimer ce point." });
    }

    await point.destroy();

    return res.status(200).json({ message: "Le point a été supprimé avec succès." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la suppression du point." });
  }
};

  export default {
    addPoint,
    deletePoint,
    getAllPoints,
    getPointByUser
  };
  
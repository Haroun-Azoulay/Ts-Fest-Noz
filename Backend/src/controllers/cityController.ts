import CityModel from "../models/City";
import { Request, Response } from "express";

const addPoint = async (req: Request, res: Response) => {
    try {
      
        const userId = req.userId; 

    
        const point = await CityModel.create({
            ...req.body,
            user_id: userId // Utilisez 'user_id' ici au lieu de 'userId'
        });

        const formattedPoint = {
            id: point.id,
            longitude: point.longitude,
            latitude: point.latitude,
            text: point.text,
            address: point.address,
            insee_code: point.insee_code,
            city_name: point.city_name,
            zip_code: point.zip_code,
            label: point.label,
            color: point.color,
            departement_name: point.departement_name,
            departement_number: point.departement_number,
            region_name: point.region_name,
            region_geo_json: point.region_geo_json,
            user_id: point.user_id, // Assurez-vous d'utiliser 'user_id' pour la réponse également
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
  

      const pointsWithUserDetails = await Promise.all(points.map(async (point) => {
        //const user = await UserModel.findByPk(point.userId, { attributes: ["id", "pseudo"] });
        return {
          id: point.id,
          address: point.address,
          //userId: point.userId,
          //user: user ? { id: user.id, pseudo: user.pseudo } : null,
        };
      }));
  
      return res.json(pointsWithUserDetails);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors de la récupération des points." });
    }
};
const getPointByUser = async (req: Request, res: Response) => {
    try {
        // Vérifier que l'ID de l'utilisateur est fourni
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "L'ID de l'utilisateur est requis." });
        }

        // Récupérer tous les points associés à cet utilisateur spécifique
        const points = await CityModel.findAll({
            where: {
                user_id: userId
            }
        });

        const simplifiedPoints = points.map(point => ({
            id: point.id,
            address: point.address,
        }));

        return res.json(simplifiedPoints);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la récupération des points par utilisateur." });
    }
};


const updatePoint = async (req: Request, res: Response) => {
    try {
        const { pointId } = req.params; 
        const userId = req.userId; 

        // Effectuer la mise à jour
        const [updatedRows] = await CityModel.update(
            { ...req.body, user_id: userId }, // Mettre à jour les champs avec les données de req.body
            { where: { id: pointId, user_id: userId } } // Condition pour s'assurer que le point appartient à l'utilisateur
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Point non trouvé ou vous n'avez pas la permission de le mettre à jour." });
        }

        // Récupérer l'instance mise à jour pour la renvoyer
        const updatedPoint = await CityModel.findOne({ where: { id: pointId } });

        if (!updatedPoint) {
            return res.status(404).json({ message: "Point mis à jour non trouvé." });
        }

        res.status(200).json(updatedPoint); // Renvoyer l'instance mise à jour
    } catch (error) {
        console.error("Erreur lors de la mise à jour du point :", error);
        res.status(500).send("Erreur lors de la mise à jour du point.");
    }
};



const deletePoint = async (req: Request, res: Response) => {
    try {
      const { pointId } = req.params;
  
      // Vérifier si le commentaire existe
      const post = await CityModel.findByPk(pointId);
      if (!post) {
        return res.status(404).json({ message: "Le point n'existe pas." });
      }
  
      // Supprimer le commentaire
      await post.destroy();
  
      return res.status(200).json({ message: "Le point supprimé avec succès." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors de la suppression du point." });
    }
  };
  export default {
    addPoint,
    updatePoint,
    deletePoint,
    getAllPoints,
    getPointByUser
  };
  
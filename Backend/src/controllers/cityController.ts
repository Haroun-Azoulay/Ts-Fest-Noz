import { CalculateDistance } from "../algorithmic/haversine";
import { CityAttributes } from "../interfaces/types";
import { CoordinateAttributes } from "../interfaces/types";
import CityModel from "../models/City";
import Event from "../models/Event";
import UserModel from "../models/User";
import HaversineFormula from "../algorithmic/haversine";
import { Request, Response } from "express";
import axios from "axios";

const addPoint = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId: string | undefined = req.userId;
    const role: string | undefined = req.role;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "The user must be authenticated" });
    }
    const point: CityModel | null = await CityModel.create({
      ...req.body,
      user_id: userId,
    });
    const formattedPoint: CityAttributes = {
      id: point.id,
      user_id: userId,
      longitude: point.longitude,
      latitude: point.latitude,
      date: point.date,
      text: point.text,
      address: point.address,
      city_name: point.city_name,
      zip_code: point.zip_code,
      label: point.label,
      color: point.color,
      departement_number: point.departement_number,
      style: point.style,
      region_name: point.region_name,
      url_point: point.url_point,
    };

    return res.status(201).json(formattedPoint);
  } catch (error) {
    console.error("Error adding a point:", error);
    return res.status(500).send("Error adding point");
  }
};
const getAllPoints = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const points: CityModel[] = await CityModel.findAll();

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

    return res.status(200).json(points);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving points" });
  }
};

const getPointNearUser = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    let responseFinal: any = {};
    const userId: string = req.params.userId;
    const points: CityModel[] | undefined = await CityModel.findAll();
    const user = await UserModel.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // if (!user.latitude || !user.longitude) {
    //   return res.status(400).json({ message: "User location is incomplete" });
    // }

    if (points) {
      let result: CoordinateAttributes[] = points.map((point) => {
        const distance = HaversineFormula.CalculateDistance(
          user.latitude,
          user.longitude,
          point.latitude,
          point.longitude,
        );
        return {
          id: point.id,
          latitude: point.latitude,
          longitude: point.longitude,
          distance: distance,
        };
      });

      result.sort((a, b) => a.distance - b.distance);
      const resultCut = result.slice(0, 3);

      const detailedResults = await Promise.all(
        resultCut.map(async (point) => {
          try {
            const response = await axios.get(
              `http://localhost:3000/get-point-id/${point.id}`,
            );
            return { ...point, details: response.data };
          } catch (error) {
            console.error(error);
            return { ...point };
          }
        }),
      );

      responseFinal = detailedResults;
    }

    return res.status(200).json(responseFinal);
  } catch (error) {
    console.error("Error in getPointNearUser:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getPointByUser = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId: string = req.params.userId;
    const points: CityModel[] | null = await CityModel.findAll({
      where: {
        user_id: userId,
      },
    });
    return res.status(200).json(points);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error retrieving points per user" });
  }
};

const getPointById = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const cityId: string = req.params.cityId;
    const points: CityModel | null = await CityModel.findByPk(cityId, {
      attributes: [
        "id",
        "city_name",
        "text",
        "address",
        "zip_code",
        "label",
        "date",
        "style",
        "color",
        "departement_number",
        "region_name",
        "url_point",
      ],
    });
    return res.status(200).json(points);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error retrieving points per user" });
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

const deletePoint = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId: string | undefined = req.userId;
    const { pointId } = req.params;
    const point: CityModel | null = await CityModel.findOne(
      {where : {id: pointId, user_id: userId}}
    );
    console.log("userId : " + userId);
    console.log("pointId : " + pointId);
    console.log("point : " + point);
    if (!point) {
      return res.status(404).json({ message: "The point does not exist" });
    }
    // if (point.userId !== userId) {
    //   return res
    //     .status(403)
    //     .json({ message: "You do not have permission to delete this item" });
    // }
    CityModel.beforeDestroy(async (city, options) => {
      await Event.destroy({
        where: { id: point.id },
      });
    });
    await point.destroy();
    return res
      .status(200)
      .json({ message: "The point was successfully deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting point" });
  }
};

export default {
  addPoint,
  deletePoint,
  getAllPoints,
  getPointByUser,
  getPointNearUser,
  getPointById,
};

const Maps = require("../models/Maps");
const verifyToken = require("../middlewares/verifyToken");

// Ajouter un nouveau point
const addPoint = async (req, res) => {
  try {
    const point = await Maps.create(req.body);
    const formattedPoint = {
        id: point.id,
        coordinates: {
          longitude: point.longitude,
          latitude: point.latitude
        },
        text: point.text,
        address: point.address,
        color: point.color
      };
  
      res.status(201).json(formattedPoint);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un point :", error);
    res.status(500).send("Erreur lors de l'ajout d'un point");
  }
};

// Obtenir tous les points
const getAllPoints = async (req, res) => {
    try {
      const points = await Maps.findAll();
      const formattedPoints = points.map(point => ({
        id: point.id,
        coordinates: {
          longitude: point.longitude,
          latitude: point.latitude
        },
        text: point.text,
        address: point.address,
        color: point.color
      }));
  
      res.json(formattedPoints);
    } catch (error) {
      console.error("Erreur lors de la récupération des points :", error);
      res.status(500).send("Erreur lors de la récupération des points");
    }
  };


function deletePoint (req, res, next) {
    Maps.destroy({
            where: {
                id: 1,
            },
        })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({});
        });
};

module.exports = {
  addPoint,
  getAllPoints,
  deletePoint
};

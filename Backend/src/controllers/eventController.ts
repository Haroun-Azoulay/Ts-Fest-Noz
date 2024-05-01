import EventModel from "../models/Event";
import { Request, Response } from "express";

const addEvent = async (req: Request, res: Response) => {
    try {
      
        // const userId = req.userId; 

    
        const event = await EventModel.create({
            ...req.body,
        });

        const formattedEvent = {
            id: event.id,
            name: event.name,
            description: event.description,
            url: event.url
        };
    
        res.status(201).json(formattedEvent);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un point :", error);
      res.status(500).send("Erreur lors de l'ajout d'un point");
    }
};

const getEventById = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        
        const event = await EventModel.findByPk(eventId, {
            attributes: ['id', 'name', 'description']
        });
        

        if (event) {
            return res.json(event);
        } else {
            return res.status(404).json({ message: "Event non trouvé" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la récupération de l'événement par ID." });
    }
};


const getAllEvents = async (req: Request, res: Response) => {
    try {

        const events = await EventModel.findAll();
      return res.json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors de la récupération des points." });
    }

};

  export default {
    addEvent,
    getAllEvents,
    getEventById,
    // getPointByUser
  };
  
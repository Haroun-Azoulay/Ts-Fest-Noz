import EventModel from "../models/Event";
import PaymentModel from "../models/Payment";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const addEvent = async (req: Request, res: Response) => {
    try {
        console.log("addEvent - req.body:", req.body);

        const event = await EventModel.create({
            ...req.body,
        });

        const formattedEvent = {
            id: event.id,
            name: event.name,
            description: event.description,
            url: event.url
        };

        console.log("addEvent - formattedEvent:", formattedEvent);
        res.status(201).json(formattedEvent);
    } catch (error) {
        console.error("Erreur lors de l'ajout d'un événement :", error);
        res.status(500).send("Erreur lors de l'ajout d'un événement");
    }
};

const getEventById = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        console.log("getEventById - eventId:", eventId);

        const event = await EventModel.findByPk(eventId, {
            attributes: ['id', 'name', 'description']
        });

        if (event) {
            console.log("getEventById - event found:", event);
            return res.json(event);
        } else {
            console.log("getEventById - event not found");
            return res.status(404).json({ message: "Event non trouvé" });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'événement par ID.", error);
        return res.status(500).json({ message: "Erreur lors de la récupération de l'événement par ID." });
    }
};

const getAllEvents = async (req: Request, res: Response) => {
    try {
        console.log("getAllEvents - fetching all events");

        const events = await EventModel.findAll();
        console.log("getAllEvents - events found:", events);
        return res.json(events);
    } catch (error) {
        console.error("Erreur lors de la récupération des événements.", error);
        return res.status(500).json({ message: "Erreur lors de la récupération des événements." });
    }
};

const addPayment = async (req: Request, res: Response) => {
    try {
        const userId = req.userId; 
        const eventId = req.params.id;
        console.log("addPayment - userId:", userId, "eventId:", eventId, "req.body:", req.body);

        const token = jwt.sign(
            { userId: userId },
            "RANDOM_SECRET_KEY",
            { expiresIn: "24h" }
        );

        const payment = await PaymentModel.create({
            ...req.body,
            token
        });
        const formattedPayment = {
            id: payment.id,
            payment: payment.payment,
            token: token,
        };

        console.log("addPayment - formattedPayment:", formattedPayment);
        res.status(201).json(formattedPayment);
    } catch (error) {
        console.error("Erreur lors de l'ajout d'un paiement :", error);
        res.status(500).send("Erreur lors de l'ajout d'un paiement");
    }
};

const getPaymentById = async (req: Request, res: Response) => {
    try {
        const { eventId, paymentId } = req.params;
        console.log("getPaymentById - eventId:", eventId, "paymentId:", paymentId);

        const payment = await PaymentModel.findOne({
            where: {
                id: paymentId,
            },
            attributes: ['id', 'payment', 'token']
        });

        if (payment) {
            console.log("getPaymentById - payment found:", payment);
            return res.json(payment);
        } else {
            console.log("getPaymentById - payment not found");
            return res.status(404).json({ message: "Paiement non trouvé" });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du paiement par ID.", error);
        return res.status(500).json({ message: "Erreur lors de la récupération du paiement par ID." });
    }
};


const verifyTokenOATUH = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Token manquant" });
        }

        const payment = await PaymentModel.findOne({ where: { token } });
        if (!payment) {
            return res.status(401).json({ message: "Token invalide ou non trouvé dans la base de données" });
        }

        jwt.verify(token, "RANDOM_SECRET_KEY", (err: any, decoded: any) => {
            if (err) {
                console.error("Token invalide :", err);
                return res.status(401).json({ message: "Token invalide" });
            }

            console.log("Token valide :", decoded);
            return res.status(201).json({ message: "Token valide", data: decoded });
        });
    } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        return res.status(500).json({ message: "Erreur lors de la vérification du token" });
    }
};
const deleteToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        console.log("deleteToken - token:", token);

        const payment = await PaymentModel.findOne({ where: { token } });
        if (!payment) {
            return res.status(404).json({ message: "Le token n'existe pas." });
        }

        await payment.destroy();
        console.log("deleteToken - payment deleted:", payment);

        return res.status(200).json({ message: "Le token a été supprimé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du token :", error);
        return res.status(500).json({ message: "Erreur lors de la suppression du token." });
    }
};

export default {
    verifyTokenOATUH,
    deleteToken,
    addEvent,
    getAllEvents,
    getEventById,
    addPayment,
    getPaymentById
};

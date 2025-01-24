import { EventAttributes, PaymentAttributes } from "../interfaces/types";
import EventModel from "../models/Event";
import CityModel from "../models/City";
import PaymentModel from "../models/Payment";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const addEvent = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const event: EventModel = await EventModel.create({
      ...req.body,
    });

    return res.status(201).json({
      id: event.id,
      name: event.name,
      city_id: event.city_id,
      user_id: event.user_id,
      description: event.description,
      url: event.url,
      mapId: event.mapId
    });
  } catch (error) {
    console.error("Error adding an event:", error);
    return res.status(500).send("Error adding event");
  }
};

const getEventsByCity = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const cityName: string = req.params.city;
    var eventsByCityName: EventModel[] = [];
    const citiesByCityName: CityModel[] | null = await CityModel.findAll({
      where: { city_name: cityName },
    });
    for (const city of citiesByCityName) {
      const event: EventModel | null = await EventModel.findByPk(city.id, {
        attributes: ["id", "name", "description"],
      });
      eventsByCityName!.push(event!);
    }
    return res.status(200).json(eventsByCityName);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving events by city" });
  }
};

const getEventById = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const eventId: string = req.params.id;
    const event: EventModel | null = await EventModel.findByPk(eventId, {
      attributes: ["id", "name", "description"],
    });
    if (event) {
      return res.status(200).json(event);
    }
    return res.status(404).json({ message: "Event non trouvé" });
  } catch (error) {
    console.error("Error retrieving event by ID", error);
    return res.status(500).json({ message: "Error retrieving event by ID" });
  }
};

const getAllEvents = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const events: EventModel[] = await EventModel.findAll();
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error retrieving events", error);
    return res.status(500).json({ message: "Error retrieving events" });
  }
};

const addPayment = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
<<<<<<< HEAD
    const userId: string | undefined = req.userId;
    const eventId: string | undefined = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "userId est requis" });
    }
    if (!eventId) {
      return res.status(400).json({ error: "eventId est requis" });
    }

=======
    const userId: string = req.userId!;
    const eventId: string = req.params.id;
>>>>>>> cc7f5544 (Unit Tests of Event 90% Overall Result coverage)
    console.log(
      "📌 addPayment - userId:",
      userId,
      "eventId:",
      eventId,
      "req.body:",
      req.body,
    );
    const token: string = jwt.sign({ userId: userId }, "RANDOM_SECRET_KEY", {
      expiresIn: "24h",
    });
    const payment: PaymentModel = await PaymentModel.create({
<<<<<<< HEAD
      ...req.body,
      userId,
      eventId,
      token,
    });

    const formattedPayment: PaymentAttributes = {
=======
      token: token,
      payment: req.body.payment,
      userId: userId,
      eventId: eventId
    });
    return res.status(201).json({
>>>>>>> cc7f5544 (Unit Tests of Event 90% Overall Result coverage)
      id: payment.id,
      payment: payment.payment,
      token: token,
      eventId: eventId,
<<<<<<< HEAD
      userId: userId,
    };

    console.log("✅ addPayment - formattedPayment:", formattedPayment);
    return res.status(201).json(formattedPayment);
=======
    });
>>>>>>> cc7f5544 (Unit Tests of Event 90% Overall Result coverage)
  } catch (error) {
    console.error("❌ Error adding a payment:", error);
    return res.status(500).send("Error adding a payment");
  }
};

const getPaymentById = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const eventId: string = req.params.eventId;
    const paymentId: string = req.params.paymentId;
    console.log("getPaymentById - eventId:", eventId, "paymentId:", paymentId);

    const payment: PaymentModel | null = await PaymentModel.findOne({
      where: {
        id: paymentId,
      },
      attributes: ["id", "payment", "token"],
    });

    if (payment) {
      return res.status(200).json(payment);
    }
    return res.status(404).json({ message: "Payment not found" });
  } catch (error) {
    console.error("Error retrieving payment by ID", error);
    return res.status(500).json({ message: "Error retrieving payment by ID" });
  }
};

const verifyTokenOAUTH = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const token: string = req.body.token;
    if (!token) {
      return res.status(400).json({ message: "Missing token" });
    }
    const payment: PaymentModel | null = await PaymentModel.findOne({
      where: { token },
    });
    if (!payment) {
      return res
        .status(401)
        .json({ message: "Invalid token or not found in database" });
    }
    jwt.verify(token, "RANDOM_SECRET_KEY", (err: any, decoded: any) => {
      if (err) {
        console.error("Invalid token :", err);
        return res.status(401).json({ message: "Invalid token" });
      }
      return res.status(201).json({ message: "Valid token", data: decoded });
    });
  } catch (error) {
    console.error("Error verifying token: :", error);
    return res.status(500).json({ message: "Error verifying token" });
  }
};

const deleteToken = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const token: string = req.params.token;
    console.log("deleteToken - token:", token);
    const payment: PaymentModel | null = await PaymentModel.findOne({
      where: { token },
    });
    if (!payment) {
      return res.status(404).json({ message: "The token does not exist" });
    }
    await payment.destroy();
    return res
      .status(200)
      .json({ message: "The token was successfully deleted" });
  } catch (error) {
    console.error("Error deleting token :", error);
    return res.status(500).json({ message: "Error deleting token" });
  }
};

export default {
  verifyTokenOAUTH,
  deleteToken,
  addEvent,
  getEventsByCity,
  getAllEvents,
  getEventById,
  addPayment,
  getPaymentById,
};

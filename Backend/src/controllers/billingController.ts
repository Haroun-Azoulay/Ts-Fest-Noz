import { Request, Response } from "express";
import BillingModel from "../models/Billing";
import EventModel from "../models/Event";
import { Sequelize } from "sequelize";

const createBilling = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId: string | undefined = req.userId;
    const newBilling: BillingModel | null = await BillingModel.create({
      ...req.body,
      userId: userId
    });
    return res.status(201).json({ newBilling });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating a billing." });
  }
};

const getMyBilling = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId: string | undefined = req.userId;
    const billings: BillingModel[] | null = await BillingModel.findAll({
      where: {
        userId: userId
      },
      include: {
        model: EventModel,
        attributes: ["name"]
      }
    });
    return res.status(201).json({ billings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting the billings." });
  }
};

export default {
  createBilling,
  getMyBilling
};

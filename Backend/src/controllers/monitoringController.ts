import { Request, Response } from "express";

const getMonitoring = async (req: Request, res: Response): Promise<any> => {
  res.send("pong");
};

export default {
  getMonitoring,
};

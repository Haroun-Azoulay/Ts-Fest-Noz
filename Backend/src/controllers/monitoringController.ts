import { Request, Response } from "express";

const getMonitoring = async (req: Request, res: Response): Promise<any> => {
  res.status(200);
  res.send("pong");
};

export default {
  getMonitoring,
};

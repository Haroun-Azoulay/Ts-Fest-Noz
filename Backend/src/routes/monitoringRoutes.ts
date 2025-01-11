import express, { Router } from "express";
import monitoringController from "../controllers/monitoringController";

const router: Router = express.Router();

router.get("/ping", monitoringController.getMonitoring);

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Monitoring
 *     description: Monitoring.
 *     tags:
 *       - Monitoring
 *     responses:
 *       200:
 *         description: The service is working.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: pong
 */

export default router;

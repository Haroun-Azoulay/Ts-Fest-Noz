import express from "express";
import dotenv from "dotenv";
import sequelizeConnection from "./config/database";
import User from "./src/models/User";
import City from "./src/models/City";
import Post from "./src/models/Post";
import Commentary from "./src/models/Commentary";
import Payment from "./src/models/Payment";
import Event from "./src/models/Event";
import Map from "./src/models/Map";
import ArtistProfil from "./src/models/ArtistsProfil";
import OrganizerProfil from "./src/models/OrganizerProfil";
import Goodie from "./src/models/Goodie";
import GoodieType from "./src/models/GoodieType";
import Group from "./src/models/Group";
import GroupDetail from "./src/models/GroupDetail";
import Order from "./src/models/Order";
import OrderDetail from "./src/models/OrderDetail";
import userRoutes from "./src/routes/userRoutes";
import cityRoutes from "./src/routes/cityRoutes";
import eventRoutes from "./src/routes/eventRoutes";
import postRoutes from "./src/routes/postRoutes";
import commentaryRoutes from "./src/routes/commentaryRoutes";
import adminRoutes from "./src/routes/adminRoutes";
import goodieRoutes from "./src/routes/goodieRoutes";
import goodieTypeRoutes from "./src/routes/goodieTypeRoutes";
import groupRoutes from "./src/routes/groupRoutes";
import groupDetailRoutes from "./src/routes/groupDetailRoutes";
import orderRoutes from "./src/routes/orderRoutes";
import orderDetailRoutes from "./src/routes/orderDetailRoutes";
import "./src/models/associations";
import cors from "cors";
import path from "path";
/* const session = require('express-session');
const { AuthorizationCode } = require('simple-oauth2');
const axios = require('axios');
const crypto = require('crypto'); */
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger";
import faker from "./src/config/faker";

dotenv.config();

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

const app = express();
app.use(express.json());
app.use(cors());
// Endpoint swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use("/event", eventRoutes);
app.use("/", userRoutes);
app.use("/", cityRoutes);
app.use("/", adminRoutes);
app.use("/post", postRoutes);
app.use("/commentary", commentaryRoutes);
app.use("/goodie", goodieRoutes);
app.use("/goodietype", goodieTypeRoutes);
app.use("/group", groupRoutes);
app.use("/groupdetail", groupDetailRoutes);
app.use("/order", orderRoutes);
app.use("/orderdetail", orderDetailRoutes);

const publicDir = path.join(__dirname, "src", "public");

// Configurate to serv static files
app.use("/", express.static(publicDir));

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

app.get("/ping", (req, res) => {
  res.send("pong");
});

async function syncModels() {
  try {
    await sequelizeConnection.authenticate();
    console.log("Database connection has been established successfully.");

    await User.sync({ force: false });
    async function insertFakerData() {
      try {
        const count = await User.count();
        console.log;
        if (count === 0)
          User.bulkCreate(faker.users, {
            ignoreDuplicates: true,
          });
      } catch (error) {
        console.log("Table User is filled or an error occurred:", error);
      }
    }
    await insertFakerData();
    await Post.sync({ force: false });
    await Commentary.sync({ force: false });
    await City.sync({ force: false });
    await ArtistProfil.sync({ force: false });
    await OrganizerProfil.sync({ force: false });
    await Map.sync({ force: false });
    await Event.sync({ force: false });
    await Payment.sync({ force: false });
    await Group.sync({ force: false });
    await GroupDetail.sync({ force: false });
    await GoodieType.sync({ force: false });
    await Goodie.sync({ force: false });
    await Order.sync({ force: false });
    await OrderDetail.sync({ force: false });

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("[database]: Unable to connect to the database:", err);
  }
}

syncModels();

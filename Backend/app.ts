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
import userRoutes from "./src/routes/userRoutes";
import cityRoutes from "./src/routes/cityRoutes";
import eventRoutes from "./src/routes/eventRoutes";
import postRoutes from "./src/routes/postRoutes";
import commentaryRoutes from "./src/routes/commentaryRoutes";
import adminRoutes from "./src/routes/adminRoutes";
import cors from "cors";

const session = require('express-session');
const { AuthorizationCode } = require('simple-oauth2');
const axios = require('axios');
const crypto = require('crypto');

dotenv.config();

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.use("/event", eventRoutes);
app.use("/users", userRoutes);
app.use("/city", cityRoutes);
app.use("/admin", adminRoutes);
app.use("/post", postRoutes);
app.use("/commentary", commentaryRoutes);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

async function syncModels() {
  try {
    await sequelizeConnection.authenticate();
    console.log("[database]: Database connection has been established successfully.");

    await User.sync({ force: true });
    await Post.sync({ force: true });
    await Commentary.sync({ force: true });
    await City.sync({ force: true });
    await ArtistProfil.sync({ force: true });
    await OrganizerProfil.sync({ force: true });
    await Map.sync({ force: true });
    await Event.sync({ force: true });
    await Payment.sync({ force: true });

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("[database]: Unable to connect to the database:", err);
  }
}

syncModels();

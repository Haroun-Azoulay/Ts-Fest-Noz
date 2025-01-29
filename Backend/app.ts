import express from "express";
import dotenv from "dotenv";
import sequelizeConnection from "./config/database";
import User from "./src/models/User";
import City from "./src/models/City";
import Post from "./src/models/Post";
import Commentary from "./src/models/Commentary";
import Payment from "./src/models/Payment";
import Event from "./src/models/Event";
import OrganizerProfil from "./src/models/OrganizerProfil";
import Goodie from "./src/models/Goodie";
import GoodieType from "./src/models/GoodieType";
import Group from "./src/models/Group";
import GroupUser from "./src/models/GroupUser";
import Order from "./src/models/Order";
import OrderDetail from "./src/models/OrderDetail";
import userRoutes from "./src/routes/userRoutes";
import cityRoutes from "./src/routes/cityRoutes";
import monitoringRoutes from "./src/routes/monitoringRoutes";
import eventRoutes from "./src/routes/eventRoutes";
import postRoutes from "./src/routes/postRoutes";
import commentaryRoutes from "./src/routes/commentaryRoutes";
import adminRoutes from "./src/routes/adminRoutes";
import goodieRoutes from "./src/routes/goodieRoutes";
import goodieTypeRoutes from "./src/routes/goodieTypeRoutes";
import groupRoutes from "./src/routes/groupRoutes";
import groupUserRoutes from "./src/routes/groupUserRoutes";
import { organizerProfils, retryDb } from "./src/config/faker";

// import orderRoutes from "./src/routes/orderRoutes";
// import orderDetailRoutes from "./src/routes/orderDetailRoutes";
import "./src/models/associations";
import cors from "cors";
import path from "path";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger";
import faker from "./src/config/faker";
import logger from "node-color-log";
import { ArtistProfil } from "./src/models/associations";

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

app.use(monitoringRoutes);
app.use(eventRoutes);
app.use(userRoutes);
app.use(cityRoutes);
app.use(adminRoutes);
app.use(postRoutes);
app.use(commentaryRoutes);
app.use(goodieRoutes);
app.use(goodieTypeRoutes);
app.use(groupRoutes);
app.use(groupUserRoutes);
// app.use(orderRoutes);
// app.use(orderDetailRoutes);

async function syncModels() {
  try {
    await sequelizeConnection.authenticate();
    logger.success("Database connection has been established successfully.");

    await User.sync({ force: false });
    await Post.sync({ force: false });
    await City.sync({ force: false });
    await Commentary.sync({ force: false });
    await Event.sync({ force: false });
    await Group.sync({ force: false });
    await GoodieType.sync({ force: false });
    await GroupUser.sync({ force: false });
    await Goodie.sync({ force: false });
    await OrderDetail.sync({ force: false });
    await Order.sync({ force: false });
    await Payment.sync({ force: false });
    await OrganizerProfil.sync({ force: false });
    await ArtistProfil.sync({ force: false });

    async function insertFakerData() {
      try {
        const countUser = await User.count();
        const countPost = await Post.count();
        const countCity = await City.count();
        const countCommentary = await Commentary.count();
        const countEvent = await Event.count();
        const countGoodieType = await GoodieType.count();
        const countGroup = await Group.count();
        const countGroupUser = await GroupUser.count();
        const countGoodie = await Goodie.count();
        const countOrderDetail = await OrderDetail.count();
        const countOrder = await Order.count();
        const countPayment = await Payment.count();
        const countOrganizeProfil = await OrganizerProfil.count();
        const countArtistProfil = await ArtistProfil.count();

        const nb = 0;
        switch (nb) {
          case countUser:
            await retryDb(() =>
              User.bulkCreate(faker.users, {
                ignoreDuplicates: true,
              }),
            );
          case countPost:
            await retryDb(() =>
              Post.bulkCreate(faker.posts, {
                ignoreDuplicates: true,
              }),
            );
          case countCity:
            await retryDb(() =>
              City.bulkCreate(faker.cities, {
                ignoreDuplicates: true,
              }),
            );
          case countCommentary:
            await retryDb(() =>
              Commentary.bulkCreate(faker.commentaries, {
                ignoreDuplicates: true,
              }),
            );
          case countEvent:
            await retryDb(() =>
              Event.bulkCreate(faker.events, {
                ignoreDuplicates: true,
              }),
            );
          case countGroup:
            await retryDb(() =>
              Group.bulkCreate(faker.groups, {
                ignoreDuplicates: true,
              }),
            );
          case countGroupUser:
            await retryDb(() =>
              GroupUser.bulkCreate(faker.groupUsers, {
                ignoreDuplicates: true,
              }),
            );
          // case countGoodieType:
          //   await retryDb(() =>
          //     GoodieType.bulkCreate(faker.goodieTypes, {
          //       ignoreDuplicates: true,
          //     }),
          //   );
          // case countGoodie:
          //   await retryDb(() =>
          //     Goodie.bulkCreate(faker.goodies, {
          //       ignoreDuplicates: true,
          //     }),
          //   );
          // case countOrderDetail:
          //   await retryDb(() =>
          //     OrderDetail.bulkCreate(faker.orderDetails, {
          //       ignoreDuplicates: true,
          //     }),
          //   );
          // case countOrder:
          //   await retryDb(() =>
          //     Order.bulkCreate(faker.orders, {
          //       ignoreDuplicates: true,
          //     }),
          //   );
          // case countPayment:
          //   await retryDb(() =>
          //     Payment.bulkCreate(faker.payments, {
          //       ignoreDuplicates: true,
          //     }),
          //   );
          case countOrganizeProfil:
            await retryDb(() =>
              OrganizerProfil.bulkCreate(faker.organizerProfils, {
                ignoreDuplicates: true,
              }),
            );
          case countArtistProfil:
            await retryDb(() =>
              ArtistProfil.bulkCreate(faker.artistProfils, {
                ignoreDuplicates: true,
              }),
            );
        }
      } catch (error) {
        logger.error("Table User is filled or an error occurred:", error);
      }
    }

    await insertFakerData();

    app.listen(port, () => {
      logger.success(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    logger.error("[database]: Unable to connect to the database:", err);
  }
}

syncModels();

module.exports = app;

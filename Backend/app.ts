import express from "express";
import dotenv from "dotenv";
import sequelizeConnection from "./config/database";
import User, { UserAttributes } from "./src/models/User";
import City from "./src/models/City";
import ArtistProfil from "./src/models/ArtistsProfil";
import OrganizerProfil from "./src/models/OrganizerProfil";
import userRoutes from "./src/routes/userRoutes"; 
import cityRoutes from "./src/routes/cityRoutes"; 

const cors = require('cors');

dotenv.config();
  
declare module 'express' { 
    export interface Request {
      userId?: string;
    }
  }

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;


app.use('/users', userRoutes);
app.use('/city', cityRoutes);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});



sequelizeConnection
  .authenticate()
  .then(() => {
    console.log(
      "[database]: Database connection has been established successfully."
    );

    // Synchroniser les modèles de la base de données
    User.sync({ force: false }).then(() => {
      City.sync({ force: false }).then(() => {
        ArtistProfil.sync({ force: false }).then(() => {
          OrganizerProfil.sync({ force: false }).then(() => {
          // Démarrer le serveur Express après la synchronisation des modèles
          app.listen(port, () => {
            console.log(
              `[server]: Server is running at http://localhost:${port}`
            );
          });
          });
        });
      });
    });
  })
  .catch((err) => {
    console.error("[database]: Unable to connect to the database:", err);
  });

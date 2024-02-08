"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const User_1 = __importDefault(require("./src/Models/User"));
const City_1 = __importDefault(require("./src/Models/City"));
const ArtistsProfil_1 = __importDefault(require("./src/Models/ArtistsProfil"));
const OrganizerProfil_1 = __importDefault(require("./src/Models/OrganizerProfil"));
const userRoutes_1 = __importDefault(require("./src/Routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.use('/users', userRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
database_1.default
    .authenticate()
    .then(() => {
    console.log("[database]: Database connection has been established successfully.");
    // Synchroniser les modèles de la base de données
    User_1.default.sync({ force: true }).then(() => {
        City_1.default.sync({ force: true }).then(() => {
            ArtistsProfil_1.default.sync({ force: true }).then(() => {
                OrganizerProfil_1.default.sync({ force: true }).then(() => {
                    // Démarrer le serveur Express après la synchronisation des modèles
                    app.listen(port, () => {
                        console.log(`[server]: Server is running at http://localhost:${port}`);
                    });
                });
            });
        });
    });
})
    .catch((err) => {
    console.error("[database]: Unable to connect to the database:", err);
});
//# sourceMappingURL=app.js.map
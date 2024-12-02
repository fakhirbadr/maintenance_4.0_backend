import express from "express";
import morgan from "morgan";
import cors from "cors"; // Ajoutez cette ligne
import uniteRouter from "./routes/uniteRoutes.js";
import dotenv from "dotenv";
import ticketMaintenanceRoutes from "./routes/ticketMaintenanceRoutes.js";
import fournitureRoutes from "../backend/ticket_fourniture/routes/ticketFournitureRoutes.js";
import userRoutes from "../backend/user/routes/userRoute.js";
dotenv.config();

const app = express();

// Utilisation de CORS pour autoriser les requêtes cross-origin
app.use(cors({ origin: "http://localhost:8080" })); // Autorise seulement les requêtes depuis http://localhost:8080

// 1) MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`Heure de la requête : ${req.requestTime}`);
  next();
});

// 2) ROUTES
app.use("/api/v1/unite", uniteRouter);

app.use("/api/v1/ticketMaintenance", ticketMaintenanceRoutes);
app.use("/api/v1/fournitureRoutes", fournitureRoutes);
app.use("/api/v1/users", userRoutes);

export default app;

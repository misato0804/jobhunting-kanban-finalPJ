import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db/postgres";
import companyRoutes from "./routes/companyRoutes";
import seekerRoutes from "./routes/seekerRoutes";
import authRoutes from "./routes/authRoutes";
import calendarRoutes from "./routes/calendarRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
dotenv.config();

const app: Express = express();
const port = 8080;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRoutes);
app.use("/seekers", seekerRoutes);
app.use("/companies", companyRoutes);
app.use("/calenders", calendarRoutes);
app.use("/schedules", scheduleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript server");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next();
});

app.listen(port, () => {
  console.log(`[server] server is listening on port ${port}`);
});

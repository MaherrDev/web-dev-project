import "dotenv/config";

import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import formRoutes from "./routes/form.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/forms", formRoutes);

app.listen(process.env.PORT, () => {
  console.log("listening to ", process.env.PORT)
});
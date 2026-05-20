import "dotenv/config";

import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contact.js";
import ordersRoutes from "./routes/orders.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.send("backend works");
});

app.use("/contact", contactRoutes);
app.use("/orders", ordersRoutes);

app.listen(3000, function () {
    console.log("Server running on ", 3000);
});
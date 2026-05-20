import express from "express";
import pool from "../pool.js";
import { createResponse } from "../utils.js";

const ordersRouter = express.Router();

// example of post request
// {
//   "flowerType": "jouri",
//   "quantity": 10,
//   "wrapColor": "red",
//   "cardText": "Happy birthday",
//   "deliveryDate": "2026-05-20T15:30"
// }

ordersRouter.post("/", async function (req, res) {
    try {
        const flowerType = req.body.flowerType;
        const quantity = Number(req.body.quantity);
        const wrapColor = req.body.wrapColor;
        const cardText = req.body.cardText || "";
        const deliveryDate = req.body.deliveryDate;

        if (!flowerType || !quantity || !wrapColor || !deliveryDate) {
            return res.status(400).json(createResponse(false, "Missing fields"));
        }

        if (
            flowerType !== "jouri" &&
            flowerType !== "tulip" &&
            flowerType !== "lily" &&
            flowerType !== "orchid"
        ) {
            return res.status(400).json(createResponse(false, "Invalid flower type"));
        }

        if (isNaN(quantity) || quantity < 10 || quantity > 100) {
            return res.status(400).json(createResponse(false, "Quantity must be between 10 and 100"));
        }

        if (cardText.length > 50) {
            return res.status(400).json(createResponse(false, "Card text must be less than 50 chars"));
        }

        if (isNaN(Date.parse(deliveryDate))) {
            return res.status(400).json(createResponse(false, "Invalid delivery date"));
        }

        let totalPrice = 0;

        if (flowerType === "jouri") {
            totalPrice = quantity * 8;
        } else if (flowerType === "tulip") {
            totalPrice = quantity * 10;
        } else if (flowerType === "lily") {
            totalPrice = quantity * 12;
        } else if (flowerType === "orchid") {
            totalPrice = quantity * 15;
        }

        const query = `
            INSERT INTO orders
            (flower_type, quantity, wrap_color, card_text, delivery_date, total_price)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        await pool.query(query, [
            flowerType,
            quantity,
            wrapColor,
            cardText,
            deliveryDate,
            totalPrice
        ]);

        res.json({
            success: true,
            message: "Order was sent successfully",
            totalPrice: totalPrice
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(createResponse(false, "Server error"));
    }
});

ordersRouter.get("/", async function (req, res) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM orders
            ORDER BY created_at DESC
        `);

        res.json({
            success: true,
            message: "Orders fetched successfully",
            data: rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(createResponse(false, "Server error"));
    }
});

export default ordersRouter;
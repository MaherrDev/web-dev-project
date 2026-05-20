import express from "express";
import pool from "../pool.js";
import { createResponse } from "../utils.js";

const contactRouter = express.Router();

// Example of a post request to Contact message
// {
//   "firstname": "Maher",
//   "lastname": "Almutairi",
//   "gender": "male",
//   "mobile": "0512345678",
//   "birthdate": "2006-09-17",
//   "email": "maher@test.com",
//   "language": "ar",
//   "message": "inquiring abuot flowers"
// }

contactRouter.post("/", async function (req, res) {
    try {
        const firstName = req.body.firstname;
        const lastName = req.body.lastname;
        const gender = req.body.gender;
        const mobile = req.body.mobile;
        const birthdate = req.body.birthdate;
        const email = req.body.email;
        const language = req.body.language;
        const message = req.body.message;

        if (!firstName || !lastName || !gender || !mobile || !birthdate || !email || !language || !message) {
            return res.status(400).json(createResponse(false, "Missing fields"));
        }

        if (firstName.length > 20 || lastName.length > 20) {
            return res.status(400).json(createResponse(false, "Name must be less than 20 chars"));
        }

        if (gender !== "male" && gender !== "female") {
            return res.status(400).json(createResponse(false, "Invalid gender"));
        }

        if (!/^05\d{8}$/.test(mobile)) {
            return res.status(400).json(createResponse(false, "Mobile number must start with 05 and contain 10 numbers"));
        }

        if (!email.includes("@") || !email.includes(".")) {
            return res.status(400).json(createResponse(false, "Incorrect email, try again"));
        }

        if (language !== "ar" && language !== "en" && language !== "fr") {
            return res.status(400).json(createResponse(false, "Invalid language"));
        }

        if (message.length < 10) {
            return res.status(400).json(createResponse(false, "Message must be longer than 10 chars"));
        }

        const query = `
            INSERT INTO contact_messages
            (first_name, last_name, gender, mobile, birthdate, email, lang, message)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await pool.query(query, [
            firstName,
            lastName,
            gender,
            mobile,
            birthdate,
            email,
            language,
            message
        ]);

        res.json(createResponse(true, "Your message was sent successfully"));
    } catch (error) {
        console.log(error)
        res.status(500).json(createResponse(false, "Server error"));
    }
});

contactRouter.get("/", async function (req, res) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM contact_messages
            ORDER BY created_at DESC
        `);

        res.json({
            success: true,
            message: "contact messages fetched successfully",
            data: rows,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(createResponse(false, "Server error"));
    }
});

export default contactRouter;
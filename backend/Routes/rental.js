import express from "express";

import { db } from "../util/db.js";

import mysql2 from "mysql2";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";
const router = express.Router();

router.get("/getRentedBicycleUser", verifyJwtToken, async (req, res) => {
  const userId = req.id;

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const [rentals] = await connection
        .promise()
        .query(`SELECT * FROM rentals WHERE user_id='${userId}' AND status='rented'`);

      return res
        .status(200)
        .json({ message: "Rented bicycles fetched successfully", data: rentals });
    } 
    catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    } 
    finally {
      connection.close();
    }
  } 
  catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getCompletedRentsInfo", verifyJwtToken, async (req, res) => {
  const userId = req.id;

  try {
    const connection = await mysql2.createConnection(db);
    try {
        const [completedRentals] = await connection
        .promise()
        .query(`SELECT * FROM rentals WHERE user_id='${userId}' AND status='completed'`);

      return res
        .status(200)
        .json({ message: "Completed rentals fetched successfully", data: completedRentals });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

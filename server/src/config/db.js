import mongoose from "mongoose";

// utils
import logger from "../utils/logger.js";

const dbConnection = async () => {
  try {
    const db = process.env.DB.replace("<db_password>", process.env.DB_PASSWORD);
    await mongoose.connect(db, { dbName: "task-managment" });
    logger.info("DB connection established");
  } catch (err) {
    logger.error("Failed to connect to db", err);
  }
};

export default dbConnection;

import app from "./app.js";
// config
import dbConnection from "./config/db.js";

// utils
import logger from "./utils/logger.js";

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  try {
    await dbConnection();
    logger.info(`Server is running on port ${port} 🎆`);
  } catch (err) {
    logger.error("Failed to start server", err);
  }
});

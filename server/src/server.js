import { server } from "./config/socket.js";
// config
import dbConnection from "./config/db.js";

// utils
import logger from "./utils/logger.js";

const port = process.env.PORT || 8000;

server.listen(port, async () => {
  try {
    await dbConnection();
    logger.info(`Server is running on port ${port} 🎆`);
  } catch (err) {
    logger.error("Failed to start server", err);
  }
});

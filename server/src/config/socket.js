import http from "http";
import { Server } from "socket.io";

import app from "../app.js";
import logger from "../utils/logger.js";
import AppErrors from "../utils/appErrors.js";
import errorMessages from "../constants/errorMessages.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// middleware to take token from user and verify it
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new AppErrors(errorMessages.jwt.access_denied, 401));
  try {
    const user = await verifyToken(token);
    socket.user = user;
    next();
  } catch (err) {
    return next(new AppErrors(errorMessages.jwt.invalid_token, 401));
  }
});

// for connect user
const connectedUsers = {};

// handle connection
io.on("connection", (socket) => {
  const userId = socket.user._id;
  console.log(userId, "test");
  connectedUsers[userId] = socket.id;
  logger.info("user connect to socket");

  // disconnected
  socket.on("disconnect", () => {
    logger.info(`User ${userId} disconnected from socket`);
    delete connectedUsers[userId];
  });
});
export { io, server, connectedUsers };

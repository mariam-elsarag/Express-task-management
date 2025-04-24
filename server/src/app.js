import express from "express";
import cors from "cors";
// for security
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

// utils
import AppErrors from "./utils/appErrors.js";

// middlewares
import globalErrors from "./middlewares/error.middleware.js";

// routes
import authRoutes from "./api/auth/auth.route.js";

const app = express();

// cors
app.use(cors());
// body parser
app.use(express.json());

// For security
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

// routes
app.use("/api/auth", authRoutes);

// handle unmatched  routes
app.all("*", (req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server`, 400));
});

// After all your route definitions
// global error handling middleware
app.use(globalErrors);
export default app;

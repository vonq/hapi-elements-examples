import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import AppController from "./app/app.controller";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "*", // Allow all methods (GET, POST, PUT, DELETE, etc.)
    allowedHeaders: "*", // Allow all headers
  })
);

// Middleware
app.use(express.json());

/* Init Database */
const appController = new AppController();

app.get(
  "/api/users",
  appController.userController.onGetAllUsersForFrontendDemo
);

app.post(
  appController.vonqHAPIController.generateJWTTokenPath,
  appController.vonqHAPIController.onGenerateJWTTokenRequest
);

app.post(
  appController.vonqHAPIController.refreshJWTTokenPath,
  appController.vonqHAPIController.onRefreshJWTTokenRequest
);

// Routes
app.all(
  appController.vonqHAPIController.allRoutePaths,
  appController.vonqHAPIController.onProxyRequest
);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

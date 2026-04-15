import dotenv from "dotenv";
dotenv.config();
import connectDB from "./database.js";
import app from "./app.js";

// REVIEW: Inconsistent indentation throughout this file — pick a consistent style (2-space or 4-space)
const startServer = async () => {
  try {
    await connectDB();
    // REVIEW: Should be process.env.PORT (uppercase) to match .env.example which defines PORT=
    const port = process.env.port || 8000;

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    // REVIEW: BUG — error is inside the string literal, not interpolated. Should be: console.error("failed to start server:", error)
    console.error("failed to start server:, error");
  }
};

startServer();

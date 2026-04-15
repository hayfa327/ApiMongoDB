import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // REVIEW: SECURITY — Logging the full MongoDB URI exposes credentials in logs. Remove or mask this.
    console.log("MONGO URI:", process.env.MONGODB_URI);
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);

    console.log(`Database name: ${connectionInstance.connection.name}`);
  } catch (error) {
    // REVIEW: If DB connection fails the server still starts and serves requests that will all fail. Should call process.exit(1) here.
    console.log("MongoDB connection failed", error.message);
  }
};

export default connectDB;

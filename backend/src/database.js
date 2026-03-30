import mongoose from "mongoose";


const connectDB = async () => {
  try {
     console.log("MONGO URI:", process.env.MONGODB_URI);
const connectionInstance = await mongoose.connect(
   process.env.MONGODB_URI);


   console.log(`MongoDB connected: ${connectionInstance.connection.host}`);

  console.log(`Database name: ${connectionInstance.connection.name}`);
  }
  catch (error) {
console.log("MongoDB connection failed", error.message);
  }
}; 

export default connectDB;


import mongoose from "mongoose";


const connectDB = async () => {
  try {
const connectionInstance = await mongoose.connect(
   process.env.MONGODB_URI);


   console.log(`MongoDB connected: ${connectionInstance.connection.host}`);


  }
  catch (error) {
console.log("MongoDB connection failed", error.message);
  }
}; 

export default connectDB;




















/*const connectDB = async () => {
  try {
    const connectioInstance = await mongoose.connect 
    (`${process.env.MONGODB_URI}`)
    console.log(`\n MongoDB connected !!!  
    const connectioInstance = await mongoose.connect 
    ${connectioInstance.connection.host}`);

  } catch (error) {
  console.log("MongoDB connection failed, error"); 
  process.exit(1)
  }
}

export default connectDB;'*/
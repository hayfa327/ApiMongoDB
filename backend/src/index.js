import dotenv from "dotenv";
dotenv.config();
import connectDB from "./database.js";
import app from "./app.js";



const startServer = async () => {
  try {
await connectDB();

const port =process.env.port || 8000; 

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`); 
});
  }

  catch (error){
console.error("failed to start server:, error")
  }
}; 


startServer(); 


 
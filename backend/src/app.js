import express from "express"
import cors from "cros";

const app = express();



//import routes
import userRouter from "../routes/user-route.js";
import exhibitionRouter from "../routes/exhibition-route.js";



app.use(cors());
app.use(express.json());

 
//route declaration
app.use("/api/v1/users", userRouter); 


//route:  https://mesum-api.onrender.com/api/v1/users/register
// route:  https://mesum-api.onrender.com/api/v1/users/login
// route: https://mesum-api.onrender.com/api/v1/users/logout
// route: https://mesum-api.onrender.com/api/v1/users/change-password


app.use("/api/v1/exhibitions", exhibitionRouter);

// route: https://mesum-api.onrender.com/api/v1/exhibitions/create
// route: https://mesum-api.onrender.com/api/v1/exhibitions/all
// route: https://mesum-api.onrender.com/api/v1/exhibitions/artist/:artistId


 

export default app; 
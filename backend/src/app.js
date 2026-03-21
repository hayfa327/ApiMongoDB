import cors from "cros";

import express from "express"

const app = express();

app.use(express.json());

//import routes
import userRouter from "../routes/user-route.js";
import exhibitionRouter from "../routes/exhibition-route.js";
 
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


app.use(cors());

export default app; 
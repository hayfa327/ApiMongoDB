import express from "express"
import cors from "cors";

const app = express();

app.use(cors());
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
// route : https://mesum-api.onrender.com/api/v1/users/all
// route : https://mesum-api.onrender.com/api/v1/users/artists
// route : https://mesum-api.onrender.com/api/v1/users/make-admin/id


app.use("/api/v1/exhibitions", exhibitionRouter);

// route: https://mesum-api.onrender.com/api/v1/exhibitions/create
// route: https://mesum-api.onrender.com/api/v1/exhibitions/all
// route: https://mesum-api.onrender.com/api/v1/exhibitions/artist/:artistId
// route: https://mesum-api.onrender.com/api/v1/exhibitions/exhibitions/:id
// route: https://mesum-api.onrender.com/api/v1/exhibitions/exhibitions/:id 
// route:  https://mesum-api.onrender.com/api/v1/exhibitions/:id

 

export default app; 
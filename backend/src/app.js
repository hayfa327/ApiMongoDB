import express from "express"

const app = express();

app.use(express.json());

//import routes
import userRouter from "../routes/user-route.js";
import exhibitionRouter from "../routes/exhibition-route.js";
 
//route declaration
app.use("/api/v1/users", userRouter); 


//route: http://localhost:4000/api/v1/users/register
// route: http://localhost:4000/api/v1/users/login
// route: http://localhost:4000/api/v1/users/logout
// route: http://localhost:4000/api/v1/users/change-password


app.use("/api/v1/exhibitions", exhibitionRouter);

export default app; 
import {User} from "../models/user.model.js";

const registerUser = async (req , res) => {
  try {
 const {username, email, password} = req.body; 
 // basic validation 
 if (!username || !email || !password) {
  return res.status(400).json({massage: "All fields are important!"})
 }
 const existing = await User.findOne({email: email.tolowerCase()});
 if (existing) {
  return res.status(400).json({massage: "user already exists!"})
 }
  

const user = await User.create(
  {
    username, 
    email: email.tolowerCase(), 
    password,
    loggedIn: false, 
  }
); 

res.status(201).json({message: "User registered successfully",
   user: {id: user.id, email: user.email, username: user.username}
  });
 }

  catch (error) {
res.status(500).json({message: "Internal server error", error: error.message});
  }
}; 

export {
  registerUser
}
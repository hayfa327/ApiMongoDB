import {User} from "../models/user.model.js";

const registerUser = async (req , res) => {
  try {
 const {username, email, password} = req.body; 
 // basic validation 
 if (!username || !email || !password) {
  return res.status(400).json({message: "All fields are important!"})
 }
 const existing = await User.findOne({email: email.toLowerCase()});
 if (existing) {
  return res.status(400).json({message: "user already exists!"})
 }
  

const user = await User.create(
  {
    username, 
    email: email.toLowerCase(), 
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


const loginUser = async (req, res) => {
  try {
// checking if th user already exists 
const {email, password} = req.body; 
const user = await User.findOne({
email: email.toLowerCase()
  });
if (!user) return res.status(400).json ({message: "User not found"});

//  match password 

const isMatch = await user.comparePassword(password);
if (!isMatch) return res.status(400).json({
  message: "Invalid password"
});

res.status(200).json({
  message: "User logged in", 
  user: {id: user.id, email: user.email, username: user.username}
})

 } catch (error) {
res.status(500).json({
  message: "Internet Server Error"
}); 
  }
}

const logoutUser = async (req, res) => {
  try {
const {email} = req.body;

const user = await User.findOne ({
  email
});
if (!user) 
  { return res.status(404).json({message: "user not found"
}); 
}
res.status(200).json({ message: "logout successful"
}); 

 
  }
  catch(error) {
res.status(500).json({
  message: "Internal Server Error", error : error.message
});
  }
}


export {
  registerUser,
  loginUser,
  logoutUser
}
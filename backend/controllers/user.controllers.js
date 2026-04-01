import { error } from "console";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = async (req , res) => {
  try {
 const {username, email, password} = req.body; 
 // basic validation 
 if (!username || !email || !password) {
  return res.status(400).json({message: "All fields are important!"})
 }

  if (password.length < 6 || password.length > 15) {
      return res.status(400).json({
        message: "Password must be 6–15 characters",
      });
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
     role: "visitor"
  }
); 

res.status(201).json({message: "User registered successfully",
   user: {id: user.id, email: user.email, username: user.username, role: user.role}
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

const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


res.status(200).json({
  message: "User logged in", 
  user: {id: user.id, email: user.email, username: user.username, role: user.role},
  token: token
})

 } catch (error) {
res.status(500).json({
  message: "Internet Server Error" , error: error.message
}); 
  }
}

const logoutUser = (req, res) => {
  res.status(200).json({
    message: "Logout successful. Please remove the token on client side."
  });
};

const changePassword = async (req, res) => {
  try {
const userId = req.user.id; 
const {oldPassword, newPassword} = req.body; 


const user = await User.findById(userId);

if (!user) {
  return res.status(404).json({message: "User not found"});
}

const isMatch = await user.comparePassword(oldPassword);
if (!isMatch) {
  return res.status(400).json({ message: "old password is incorrect", 
  }); 
}

user.password = newPassword; 
await user.save();  //works with bcrypt pre save hook

res.status(200).json({message: "password changed successfully"}); 


  }
  catch (error) {
res.status(500).json({message: "Internal Server Error", error: error.message});
  }
};

 const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("username email role");

    res.status(200).json({ users });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching users", error: error.message,
    });
  }
};

const getAllArtists = async (req, res) => {
  try {
    const artists = await User.find({
      role: { $regex: "^artist$", $options: "i" } 
    }).select("_id username email role");

    res.status(200).json({ artists });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching artists",
      error: error.message,
    });
  }
};

 const addArtist = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

   
    const artist = await User.create({
      username,
      email,
      password,
      role: "artist",  
    });

    res.status(201).json({
      message: "Artist created successfully",
      artist,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating artist",
      error: error.message,
    });
  }
};

const makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "admin";
    await user.save();

    res.json({
      message: "User promoted to admin",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};


export {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  getAllUsers,
  getAllArtists,
  addArtist,
  makeAdmin

}


// for later I will  do forgotPassword and resetPassword functions
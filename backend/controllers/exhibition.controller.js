import { Exhibition } from "../models/exhibition.model.js";
import { User } from "../models/user.model.js";


const createExibition = async (req , res) => {
  try {

const {title, description, startDate, endDate, artistId} = req.body;
const artist = await User.findById(artistId)
if (!artist || artist.role !== "artist") {
  return res.status(400).json({ message : "Invalid artist"})
}

const exhibition = await Exhibition.create({
  title, 
  description, 
  startDate,
  endDate, 
  artist: artistId
});

res.status(201).json({message: "Exhibition created successfully", exhibition});


  }
  catch (error) {
    res.status(500).json({message: "Error creating exhibition", error: error.message});
  }
}



const getAllExhibitions = async (req, res) => {
  try {
    const exhibitions = await Exhibition.find().populate("artist", "username email").sort({createdAt: -1});
    res.status(200).json({exhibitions});

  }
  catch (error) {
    res.status(500).json({message: "Error fetching exhibitions", error: error.message});
  }
}






export {
  createExibition,
  getAllExhibitions
}
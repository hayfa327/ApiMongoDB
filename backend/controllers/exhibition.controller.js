import { Exhibition } from "../models/exhibition.model.js";
import { User } from "../models/user.model.js";


const createExibition = async (req , res) => {
  try {

const {title, description, startDate, endDate ,artistId,  image, artworks} = req.body;
 
const artist = await User.findById(artistId)
if   (!artist || artist.role?.trim().toLowerCase() !== "artist") {
  return res.status(400).json({ message : "Invalid artist"})
}

const exhibition = await Exhibition.create({
  title, 
  description, 
  startDate,
  endDate, 
  artist: artistId, 
  image,
  artworks
});

res.status(201).json({message: "Exhibition created successfully", exhibition});


  }
  catch (error) {
    res.status(500).json({message: "Error creating exhibition", error: error.message});
  }
}



const getAllExhibitions = async (req, res) => {
  try {
    const exhibitions = await Exhibition.find()
  .populate("artist", "username email")
  .sort({ createdAt: -1 });
    res.status(200).json({exhibitions});

  }
  catch (error) {
     console.error("GET EXHIBITIONS ERROR:", error); 
    res.status(500).json({message: "Error fetching exhibitions", error: error.message});
  }
}


const getExhibitionById = async (req, res) => {
  try {
    const { id } = req.params;

    const exhibition = await Exhibition.findById(id)
      .populate("artist", "username email")
      .sort({ createdAt: -1 });

    if (!exhibition) {
      return res.status(404).json({ message: "Exhibition not found" });
    }

    res.status(200).json({ exhibition });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching exhibition",
      error: error.message
    });
  }
};



const getExhibitionsByArtist = async (req, res) => {
  try{
const exibitions = await Exhibition.find({artist: req.params.artistId}).populate("artist", "username email").sort({createdAt: -1});
res.status(200).json({exhibitions});
  }
  catch (error) {
    res.status(500).json({message: "Error fetching exhibitions by artist", error: error.message});
  }
}



export {
  createExibition,
  getAllExhibitions, 
  getExhibitionsByArtist,
  getExhibitionById
}
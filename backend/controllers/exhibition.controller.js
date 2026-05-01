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


const getExhibitionsByArtist = async (req, res) => {
  try {
  
    const exhibitions = await Exhibition.find({
      artist: req.params.artistId
    })
      .populate("artist", "username email")
      .sort({ createdAt: -1 });

      console.log("Found exhibitions:", exhibitions.length);
    console.log(exhibitions);

    res.status(200).json({ exhibitions });

  } catch (error) {
    console.log("ERROR ❌", error);
    res.status(500).json({
      message: "Error fetching exhibitions by artist",
      error: error.message
    });
  }
};



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


const updateExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id);

    if (!exhibition) {
      return res.status(404).json({ message: "Exhibition not found" });
    }

    const user = req.user;

    const isAdmin = user.role?.trim().toLowerCase() === "admin";

    //  ONLY check ownership if NOT admin
    let isOwner = false;

    if (!isAdmin && exhibition.artist) {
      const artistId = exhibition.artist._id
        ? exhibition.artist._id.toString()
        : exhibition.artist.toString();

      isOwner = artistId === user.id.toString(); // ✅ IMPORTANT FIX
    }

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    //  UPDATE DATA
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      image: req.body.image,
      artworks: req.body.artworks
    };

    // ONLY ADMIN CAN CHANGE ARTIST
    if (isAdmin && req.body.artist) {
      updateData.artist = req.body.artist;
    }

    const updated = await Exhibition.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ exhibition: updated });

  } catch (error) {
    res.status(500).json({
      message: "Error updating exhibition",
      error: error.message
    });
  }
};


export {
  createExibition,
  getAllExhibitions, 
   getExhibitionsByArtist,
  getExhibitionById,
  updateExhibition
}
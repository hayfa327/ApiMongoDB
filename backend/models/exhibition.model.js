 import mongoose, { Schema} from "mongoose";
 

 const exhibitionSchema = new Schema(
{
  title: {
    type: String,
    required: true, 
    unique: true,
      trim: true,
      minlength: 3,
      maxlength: 100}, 
  description: {
    type: String,
    required: true,
},
  startDate: {
    type: Date,
    required: true,
 },
  endDate: {
    type: Date,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
   image: {
    type: String,
    default: "",
  },
  artworks: [
  {
       image: { type: String, required: true },
    title: { type: String },
    wall: {
      type: String,
      enum: ['wallOne', 'wallTwo', 'wallThree'],
      default: 'wallOne',
    },
  },
]
},
  
{ timestamps: true }
);


export const Exhibition = mongoose.model("Exhibition", exhibitionSchema);
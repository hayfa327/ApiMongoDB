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
  ],
 
  wallSettings: {
    type: [
      {
        wallId: {
          type: String,
          enum: ['wallOne', 'wallTwo', 'wallThree'],
          required: true,
        },
        color: { type: String, default: '#4A1F24' }, // hex color, chosen in the admin form
        contentType: {
          type: String,
          enum: ['artOnly', 'textOnly', 'both'],
          default: 'artOnly',
        },
        wallText: { type: String, default: '' }, // shown on the wall if contentType is textOnly/both
        maxArtworks: { type: Number, default: 6 }, // caps how many pieces this wall can hold
      },
    ],
    default: () => ([
      { wallId: 'wallOne', color: '#4A1F24', contentType: 'both', wallText: '', maxArtworks: 4 },
      { wallId: 'wallTwo', color: '#1F3D33', contentType: 'artOnly', wallText: '', maxArtworks: 6 },
      { wallId: 'wallThree', color: '#1B2740', contentType: 'artOnly', wallText: '', maxArtworks: 6 },
    ]),
  },
  
{ timestamps: true }
);


export const Exhibition = mongoose.model("Exhibition", exhibitionSchema);
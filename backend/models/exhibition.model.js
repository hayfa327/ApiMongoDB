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
// In exhibition.model.js — replace the wallSettings field entirely.
// wallId is now a free string ("wall-1", "wall-2", ...) instead of a
// fixed enum, so admins can add as many walls as they want.

  artworks: [
    {
      image: { type: String, required: true },
      title: { type: String },
      wallId: { type: String, default: 'wall-1' }, // renamed from "wall" — matches a wallSettings entry's id
    },
  ],

  wallSettings: {
    type: [
      {
        id: { type: String, required: true }, // e.g. "wall-1", "wall-2" — admin-assigned, not a fixed enum
        color: { type: String, default: '#F2EFE7' },
        contentType: {
          type: String,
          enum: ['artOnly', 'textOnly', 'both'],
          default: 'artOnly',
        },
        wallText: { type: String, default: '' },
        maxArtworks: { type: Number, default: 6 },
        textPosition: {
          type: String,
          enum: ['top', 'center', 'bottom'],
          default: 'top',
        },
        textSize: {
          type: String,
          enum: ['small', 'medium', 'large'],
          default: 'medium',
        },
      },
    ],
    default: () => ([
      { id: 'wall-1', color: '#F2EFE7', contentType: 'both', wallText: '', maxArtworks: 4, textPosition: 'top', textSize: 'medium' },
      { id: 'wall-2', color: '#EDEAE1', contentType: 'artOnly', wallText: '', maxArtworks: 6, textPosition: 'top', textSize: 'medium' },
      { id: 'wall-3', color: '#2B2A28', contentType: 'artOnly', wallText: '', maxArtworks: 6, textPosition: 'top', textSize: 'medium' },
    ]),
  },

// No controller changes needed beyond what's already there — updateData
// already forwards wallSettings and artworks as-is, and this is just a
// shape change within those same fields.

},
  
{ timestamps: true }
);


export const Exhibition = mongoose.model("Exhibition", exhibitionSchema);
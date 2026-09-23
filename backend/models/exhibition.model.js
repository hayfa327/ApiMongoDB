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

// In exhibition.model.js — inside each wallSettings entry, replace the
// old textSize enum with a precise number, and add textFont as a choice
// from a curated list.

  wallSettings: {
    type: [
      {
        id: { type: String, required: true },
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
        // Was an enum (small/medium/large) — now the admin types an exact
        // size directly, same idea as a font-size field in a design tool.
        textSize: { type: Number, default: 24, min: 8, max: 72 },
        // Which typeface the wall's text uses — a short curated list so
        // every choice is guaranteed to render correctly in the 3D scene.
        textFont: {
          type: String,
          enum: ['inter', 'playfair', 'merriweather', 'mono'],
          default: 'inter',
        },
      },
    ],
    default: () => ([
      { id: 'wall-1', color: '#F2EFE7', contentType: 'both', wallText: '', maxArtworks: 4, textPosition: 'top', textSize: 24, textFont: 'inter' },
      { id: 'wall-2', color: '#EDEAE1', contentType: 'artOnly', wallText: '', maxArtworks: 6, textPosition: 'top', textSize: 24, textFont: 'inter' },
      { id: 'wall-3', color: '#2B2A28', contentType: 'artOnly', wallText: '', maxArtworks: 6, textPosition: 'top', textSize: 24, textFont: 'inter' },
    ]),
  },

},
  
{ timestamps: true }
);


export const Exhibition = mongoose.model("Exhibition", exhibitionSchema);
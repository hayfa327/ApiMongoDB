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
// In exhibition.model.js — REPLACE the flat "wallSettings" field with a
// proper hierarchy: an exhibition has rooms, each room has its own walls.
// This removes the old implicit "every 3 walls = 1 room" assumption that
// lived only in frontend code — the grouping is now explicit, real data.

  rooms: {
    type: [
      {
        id: { type: String, required: true }, // e.g. "room-1"
        walls: [
          {
            id: { type: String, required: true }, // e.g. "wall-1" — this is
            // what exhibition.artworks[].wallId points to, unchanged
            slot: {
              type: String,
              enum: ['far', 'left', 'right'],
              required: true,
            },
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
            textSize: { type: Number, default: 24, min: 8, max: 72 },
            textFont: {
              type: String,
              enum: ['inter', 'playfair', 'merriweather', 'mono'],
              default: 'inter',
            },
          },
        ],
      },
    ],
    default: () => ([
      {
        id: 'room-1',
        walls: [
          { id: 'wall-1', slot: 'far', color: '#F2EFE7', contentType: 'both', wallText: '', maxArtworks: 4, textPosition: 'top', textSize: 24, textFont: 'inter' },
          { id: 'wall-2', slot: 'left', color: '#EDEAE1', contentType: 'artOnly', wallText: '', maxArtworks: 6, textPosition: 'top', textSize: 24, textFont: 'inter' },
          { id: 'wall-3', slot: 'right', color: '#2B2A28', contentType: 'artOnly', wallText: '', maxArtworks: 6, textPosition: 'top', textSize: 24, textFont: 'inter' },
        ],
      },
    ]),
  },

  // artworks[].wallId is UNCHANGED — it still points at a wall's own "id"
  // string (e.g. "wall-4"), which is now nested inside rooms[].walls
  // instead of a flat array, but the id itself still works the same way.
  artworks: [
    {
      image: { type: String, required: true },
      title: { type: String },
      wallId: { type: String, default: 'wall-1' },
    },
  ],

// In the controller (updateExhibition / createExhibition), rename the
// field being read/written from req.body.wallSettings to req.body.rooms
// — everything else about those controllers stays the same.

},
  
{ timestamps: true }
);


export const Exhibition = mongoose.model("Exhibition", exhibitionSchema);
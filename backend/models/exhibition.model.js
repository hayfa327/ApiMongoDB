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
 // In exhibition.model.js — inside exhibitionSchema, alongside the
// existing "artworks" array, add a new "wallSettings" field.
// Each of the 3 walls gets its own color, content mode, and optional text.

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

// In exhibition.model.js — add these two fields inside each wallSettings
// sub-object, alongside color/contentType/wallText/maxArtworks:

  wallSettings: {
    type: [
      {
        wallId: {
          type: String,
          enum: ['wallOne', 'wallTwo', 'wallThree'],
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

        // NEW — where on the wall the text panel sits, and how big it reads
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
      { wallId: 'wallOne', color: '#F2EFE7', contentType: 'both', wallText: '', maxArtworks: 4, textPosition: 'top', textSize: 'medium' },
      { wallId: 'wallTwo', color: '#EDEAE1', contentType: 'artOnly', wallText: '', maxArtworks: 6, textPosition: 'top', textSize: 'medium' },
      { wallId: 'wallThree', color: '#2B2A28', contentType: 'artOnly', wallText: '', maxArtworks: 6, textPosition: 'top', textSize: 'medium' },
    ]),
  },

// No controller changes needed if createExhibition / updateExhibition
// already pass req.body straight into Exhibition.create() / findByIdAndUpdate()
// — "wallSettings" will flow through exactly like "artworks" already does.
},
  
{ timestamps: true }
);


export const Exhibition = mongoose.model("Exhibition", exhibitionSchema);
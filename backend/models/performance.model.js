// models/Performance.js
import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // "performance" (theatre/dance) or "concert" — lets one collection
    // power both the Performances and Concerts sections
    type: {
      type: String,
      enum: ['performance', 'concert'],
      required: true,
    },
    image: {
      type: String,
    },
    // Link to the video (streaming or recorded playback) for this performance
    videoUrl: {
      type: String,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Optional second collaborator — remove this field entirely if you'd
    // rather keep Performance strictly one-artist, matching Exhibition.
    coArtist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    eventDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String, // e.g. "Stockholm", "Stockholm / Beirut"
      default: 'Stockholm',
    },
    isLive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
 
export const Performance = mongoose.model('Performance', performanceSchema);
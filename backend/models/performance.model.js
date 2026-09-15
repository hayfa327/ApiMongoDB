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
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // A second, optional collaborator — e.g. "Mira Nordin & Salma Harb"
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

const Performance = mongoose.model('Performance', performanceSchema);

export default Performance;
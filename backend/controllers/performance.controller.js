// controllers/performanceController.js
import Performance from '../models/performance.model.js';
import { User } from "../models/user.model.js";

const createPerformance = async (req, res) => {
  try {
    const { title, description, type, image, videoUrl, artist, coArtist, eventDate, location, isLive } = req.body;
 
    if (!title || !description || !type || !artist || !eventDate) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }
 
    const performance = await Performance.create({
      title, description, type, image, videoUrl, artist, coArtist, eventDate, location, isLive,
    });
 
    res.status(201).json({ performance });
  } catch (error) {
    res.status(500).json({ message: 'Error creating performance', error: error.message });
  }
};
 
const getAllPerformances = async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
 
    const performances = await Performance.find(filter)
      .populate('artist', 'username')
      .populate('coArtist', 'username')
      .sort({ eventDate: 1 });
 
    res.status(200).json({ performances });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching performances', error: error.message });
  }
};
 
const getPerformanceById = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id)
      .populate('artist', 'username')
      .populate('coArtist', 'username');
 
    if (!performance) {
      return res.status(404).json({ message: 'Performance not found' });
    }
 
    res.status(200).json({ performance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching performance', error: error.message });
  }
};
 
const updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id);
    if (!performance) {
      return res.status(404).json({ message: 'Performance not found' });
    }
 
    const user = req.user;
    const isAdmin = user.role?.trim().toLowerCase() === 'admin';
    const isOwner = !isAdmin && performance.artist.toString() === user.id.toString();
 
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Not authorized' });
    }
 
    const updateData = { ...req.body };
    if (!isAdmin) delete updateData.artist;
 
    const updated = await Performance.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ performance: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating performance', error: error.message });
  }
};
 
const deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id);
    if (!performance) {
      return res.status(404).json({ message: 'Performance not found' });
    }
 
    if (req.user.role?.trim().toLowerCase() !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only' });
    }
 
    await Performance.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Performance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting performance', error: error.message });
  }
};
 
export {
  createPerformance,
  getAllPerformances,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
};
const Achievement = require('../models/Achievement');

// GET all achievements
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ order: 1 });
    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single achievement by ID
const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.status(200).json(achievement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new achievement
const createAchievement = async (req, res) => {
  try {
    const { title, description, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newAchievement = new Achievement({ title, description, order });
    const savedAchievement = await newAchievement.save();

    res.status(201).json(savedAchievement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE existing achievement
const updateAchievement = async (req, res) => {
  try {
    const { title, description, order } = req.body;

    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { title, description, order },
      { new: true, runValidators: true }
    );

    if (!updatedAchievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.status(200).json(updatedAchievement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE achievement
const deleteAchievement = async (req, res) => {
  try {
    const deletedAchievement = await Achievement.findByIdAndDelete(req.params.id);

    if (!deletedAchievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.status(200).json({ message: 'Achievement deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement
};
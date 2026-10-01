const AboutCard = require('../models/AboutCard');

// GET all about cards
const getAboutCards = async (req, res) => {
  try {
    const cards = await AboutCard.find().sort({ order: 1 });
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single about card by ID
const getAboutCardById = async (req, res) => {
  try {
    const card = await AboutCard.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'About card not found' });
    }
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new about card
const createAboutCard = async (req, res) => {
  try {
    const { title, description, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newCard = new AboutCard({ title, description, order });
    const savedCard = await newCard.save();

    res.status(201).json(savedCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE existing about card
const updateAboutCard = async (req, res) => {
  try {
    const { title, description, order } = req.body;

    const updatedCard = await AboutCard.findByIdAndUpdate(
      req.params.id,
      { title, description, order },
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'About card not found' });
    }

    res.status(200).json(updatedCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE about card
const deleteAboutCard = async (req, res) => {
  try {
    const deletedCard = await AboutCard.findByIdAndDelete(req.params.id);

    if (!deletedCard) {
      return res.status(404).json({ message: 'About card not found' });
    }

    res.status(200).json({ message: 'About card deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAboutCards,
  getAboutCardById,
  createAboutCard,
  updateAboutCard,
  deleteAboutCard
};
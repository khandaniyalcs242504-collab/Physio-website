const QualificationCard = require('../models/QualificationCard');

// GET all qualification cards
const getQualificationCards = async (req, res) => {
  try {
    const cards = await QualificationCard.find().sort({ order: 1 });
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single qualification card by ID
const getQualificationCardById = async (req, res) => {
  try {
    const card = await QualificationCard.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Qualification card not found' });
    }
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new qualification card
const createQualificationCard = async (req, res) => {
  try {
    const { title, type, institution, year, icon, description, order } = req.body;

    if (!title || !type || !description) {
      return res.status(400).json({ message: 'Title, type and description are required' });
    }

    const newCard = new QualificationCard({ title, type, institution, year, icon, description, order });
    const savedCard = await newCard.save();

    res.status(201).json(savedCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE existing qualification card
const updateQualificationCard = async (req, res) => {
  try {
    const { title, type, institution, year, icon, description, order } = req.body;

    const updatedCard = await QualificationCard.findByIdAndUpdate(
      req.params.id,
      { title, type, institution, year, icon, description, order },
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Qualification card not found' });
    }

    res.status(200).json(updatedCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE qualification card
const deleteQualificationCard = async (req, res) => {
  try {
    const deletedCard = await QualificationCard.findByIdAndDelete(req.params.id);

    if (!deletedCard) {
      return res.status(404).json({ message: 'Qualification card not found' });
    }

    res.status(200).json({ message: 'Qualification card deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getQualificationCards,
  getQualificationCardById,
  createQualificationCard,
  updateQualificationCard,
  deleteQualificationCard
};
const Timeline = require('../models/Timeline');

// GET all timeline items
const getTimelineItems = async (req, res) => {
  try {
    const items = await Timeline.find().sort({ order: 1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single timeline item by ID
const getTimelineItemById = async (req, res) => {
  try {
    const item = await Timeline.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Timeline item not found' });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new timeline item
const createTimelineItem = async (req, res) => {
  try {
    const { title, description, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newItem = new Timeline({ title, description, order });
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE existing timeline item
const updateTimelineItem = async (req, res) => {
  try {
    const { title, description, order } = req.body;

    const updatedItem = await Timeline.findByIdAndUpdate(
      req.params.id,
      { title, description, order },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Timeline item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE timeline item
const deleteTimelineItem = async (req, res) => {
  try {
    const deletedItem = await Timeline.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Timeline item not found' });
    }

    res.status(200).json({ message: 'Timeline item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTimelineItems,
  getTimelineItemById,
  createTimelineItem,
  updateTimelineItem,
  deleteTimelineItem
};
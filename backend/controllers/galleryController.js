const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

// GET all gallery images
const getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ order: 1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single gallery item by ID
const getGalleryItemById = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new gallery item (with file upload)
const createGalleryItem = async (req, res) => {
  try {
    const { title, category, description, order } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newItem = new Gallery({ title, category, description, imageUrl, order });
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE existing gallery item (optionally with new file)
const updateGalleryItem = async (req, res) => {
  try {
    const { title, category, description, order } = req.body;

    const existingItem = await Gallery.findById(req.params.id);
    if (!existingItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    let imageUrl = existingItem.imageUrl;

    if (req.file) {
      const oldImagePath = path.join(__dirname, '..', existingItem.imageUrl);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.log('Old image not found or already deleted:', err.message);
      });

      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, category, description, imageUrl, order },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE gallery item
const deleteGalleryItem = async (req, res) => {
  try {
    const deletedItem = await Gallery.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    const imagePath = path.join(__dirname, '..', deletedItem.imageUrl);
    fs.unlink(imagePath, (err) => {
      if (err) console.log('Image file not found or already deleted:', err.message);
    });

    res.status(200).json({ message: 'Gallery item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};
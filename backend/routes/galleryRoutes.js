const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { protect } = require('../middleware/authMiddleware');

const {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');

router.get('/', getGalleryItems);
router.get('/:id', getGalleryItemById);
router.post('/', protect, upload.single('image'), createGalleryItem);
router.put('/:id', protect, upload.single('image'), updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
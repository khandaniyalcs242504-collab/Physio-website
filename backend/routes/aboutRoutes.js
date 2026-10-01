const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { protect } = require('../middleware/authMiddleware');

const {
  getAbout,
  updateAbout
} = require('../controllers/aboutController');

router.get('/', getAbout);
router.put('/', protect, upload.single('photo'), updateAbout);

module.exports = router;
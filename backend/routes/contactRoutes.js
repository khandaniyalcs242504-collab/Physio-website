const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getContact,
  updateContact
} = require('../controllers/contactController');

router.get('/', getContact);
router.put('/', protect, updateContact);

module.exports = router;
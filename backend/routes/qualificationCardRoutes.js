const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getQualificationCards,
  getQualificationCardById,
  createQualificationCard,
  updateQualificationCard,
  deleteQualificationCard
} = require('../controllers/qualificationCardController');

router.get('/', getQualificationCards);
router.get('/:id', getQualificationCardById);
router.post('/', protect, createQualificationCard);
router.put('/:id', protect, updateQualificationCard);
router.delete('/:id', protect, deleteQualificationCard);

module.exports = router;
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

router.get('/', getReviews);
router.get('/:id', getReviewById);
router.post('/', createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
const Review = require('../models/Review');

// GET all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ order: 1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new review
const createReview = async (req, res) => {
  try {
    const { name, reviewText, rating, order } = req.body;

    if (!name || !reviewText) {
      return res.status(400).json({ message: 'Name and review text are required' });
    }

    const newReview = new Review({ name, reviewText, rating, order });
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE existing review
const updateReview = async (req, res) => {
  try {
    const { name, reviewText, rating, order } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { name, reviewText, rating, order },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE review
const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
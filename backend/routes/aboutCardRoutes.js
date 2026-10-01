const express = require('express');
const router = express.Router();

const {
  getAboutCards,
  getAboutCardById,
  createAboutCard,
  updateAboutCard,
  deleteAboutCard
} = require('../controllers/aboutCardController');

router.get('/', getAboutCards);
router.get('/:id', getAboutCardById);
router.post('/', createAboutCard);
router.put('/:id', updateAboutCard);
router.delete('/:id', deleteAboutCard);

module.exports = router;
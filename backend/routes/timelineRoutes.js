const express = require('express');
const router = express.Router();

const {
  getTimelineItems,
  getTimelineItemById,
  createTimelineItem,
  updateTimelineItem,
  deleteTimelineItem
} = require('../controllers/timelineController');

router.get('/', getTimelineItems);
router.get('/:id', getTimelineItemById);
router.post('/', createTimelineItem);
router.put('/:id', updateTimelineItem);
router.delete('/:id', deleteTimelineItem);

module.exports = router;
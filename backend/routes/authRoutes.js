const express = require('express');
const router = express.Router();

const {
  checkSetup,
  setupAdmin,
  login
} = require('../controllers/authController');

router.get('/check-setup', checkSetup);
router.post('/setup', setupAdmin);
router.post('/login', login);

module.exports = router;
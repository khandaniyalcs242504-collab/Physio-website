const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { protect } = require('../middleware/authMiddleware');

const {
  getCertificates,
  createCertificate,
  deleteCertificate
} = require('../controllers/certificateController');

router.get('/', getCertificates);
router.post('/', protect, upload.single('image'), createCertificate);
router.delete('/:id', protect, deleteCertificate);

module.exports = router;
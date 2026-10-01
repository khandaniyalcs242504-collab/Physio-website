const Certificate = require('../models/Certificate');
const fs = require('fs');
const path = require('path');

// GET all certificates
const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1 });
    res.status(200).json(certificates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new certificate (with file upload)
const createCertificate = async (req, res) => {
  try {
    const { title, order } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newCertificate = new Certificate({ title, imageUrl, order });
    const savedCertificate = await newCertificate.save();

    res.status(201).json(savedCertificate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE certificate
const deleteCertificate = async (req, res) => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!deletedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const imagePath = path.join(__dirname, '..', deletedCertificate.imageUrl);
    fs.unlink(imagePath, (err) => {
      if (err) console.log('Image file not found or already deleted:', err.message);
    });

    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCertificates,
  createCertificate,
  deleteCertificate
};
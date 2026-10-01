const About = require('../models/About');
const fs = require('fs');
const path = require('path');

// GET about info (creates default if none exists)
const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = new About({});
      await about.save();
    }

    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE about info (creates if none exists), optional photo upload
const updateAbout = async (req, res) => {
  try {
    const { experience, patientsTreated } = req.body;

    let about = await About.findOne();

    if (!about) {
      about = new About({});
    }

    about.experience = experience !== undefined ? experience : about.experience;
    about.patientsTreated = patientsTreated !== undefined ? patientsTreated : about.patientsTreated;

    if (req.file) {
      if (about.photoUrl) {
        const oldPhotoPath = path.join(__dirname, '..', about.photoUrl);
        fs.unlink(oldPhotoPath, (err) => {
          if (err) console.log('Old photo not found or already deleted:', err.message);
        });
      }

      about.photoUrl = `/uploads/${req.file.filename}`;
    }

    await about.save();

    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAbout,
  updateAbout
};
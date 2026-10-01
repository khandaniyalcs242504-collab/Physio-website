const Contact = require('../models/Contact');

// GET contact info (creates default if none exists)
const getContact = async (req, res) => {
  try {
    let contact = await Contact.findOne();

    if (!contact) {
      contact = new Contact({});
      await contact.save();
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE contact info (creates if none exists)
const updateContact = async (req, res) => {
  try {
    const { phones, emails } = req.body;

    let contact = await Contact.findOne();

    if (!contact) {
      contact = new Contact({ phones, emails });
      await contact.save();
    } else {
      contact.phones = phones !== undefined ? phones : contact.phones;
      contact.emails = emails !== undefined ? emails : contact.emails;
      await contact.save();
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getContact,
  updateContact
};
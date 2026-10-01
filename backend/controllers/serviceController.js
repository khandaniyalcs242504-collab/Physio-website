const Service = require('../models/Service');

// GET all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new service
const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newService = new Service({ title, description });
    const savedService = await newService.save();

    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE existing service
const updateService = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE service
const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
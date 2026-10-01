const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const serviceRoutes = require('./routes/serviceRoutes');
const qualificationCardRoutes = require('./routes/qualificationCardRoutes');
const timelineRoutes = require('./routes/timelineRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const contactRoutes = require('./routes/contactRoutes');
const aboutCardRoutes = require('./routes/aboutCardRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const authRoutes = require('./routes/authRoutes');
const certificateRoutes = require('./routes/certificateRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route
app.get('/', (req, res) => {
  res.send('PhysioCare backend is running');
});

// API routes
app.use('/api/services', serviceRoutes);
app.use('/api/qualification-cards', qualificationCardRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about-cards', aboutCardRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const upload = require('./middlewares/upload');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const headerRoutes = require('./routes/headerRoutes');
const expertRoutes = require('./routes/expertRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB().then(() => {
  const seedAdmin = require('./utils/seedAdmin');
  seedAdmin();
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files (e.g., uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/header', headerRoutes);
app.use('/api/experts', expertRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example route for upload using the external multer middleware
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  res.send({ message: 'File uploaded successfully', file: req.file });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

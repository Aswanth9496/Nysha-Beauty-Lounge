const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

// Routes imports
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const headerRoutes = require('./routes/headerRoutes');
const expertRoutes = require('./routes/expertRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
})); // Set security HTTP headers
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

const allowedOrigins = [];

if (process.env.FRONTEND_URL) {
  // Can handle comma-separated URLs if needed
  const envUrls = process.env.FRONTEND_URL.split(',').map(url => url.trim());
  allowedOrigins.push(...envUrls);
}

// Standard Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps, postman)
    
    // Check if the origin is in the allowed list or if it's a Vercel preview domain
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      const err = new Error(msg);
      err.statusCode = 403; // Set to 403 Forbidden instead of default 500
      callback(err, false);
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/header', headerRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/gallery', galleryRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Centralized Error Handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Restart trigger for nodemon

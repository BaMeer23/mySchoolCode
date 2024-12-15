const express = require('express');
const cors = require('cors');

const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');
const departmentsRoute = require('./routes/departmentsRoute');
const coursesRoute = require('./routes/coursesRoute');
const studentsRoute = require('./routes/studentsRoute');

const app = express();

// Body Parser middleware to parse JSON request bodies
app.use(express.json());

// CORS middleware configuration
app.use(cors({
  origin: [
    'https://cfrontend-rj10.vercel.app',    // Local development URL
    'http://localhost:5175',                  // Another local URL (for testing)
    'https://vercel-production-url.vercel.app' // Vercel production URL
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow credentials (cookies, auth headers)
}));

// Simple routes for testing
app.get('/', (req, res) => {
  res.send("Peace");
});

app.get('/rj', (req, res) => {
  res.send("loko-loko");
});

// Use the routes for various APIs
app.use('/api/auth', authRoute);
app.use('/api/user', usersRoute);
app.use('/api/dept', departmentsRoute);
app.use('/api/cour', coursesRoute);
app.use('/api/st', studentsRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Set the server to listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

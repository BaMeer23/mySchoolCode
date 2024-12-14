const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');
const departmentsRoute = require('./routes/departmentsRoute');
const coursesRoute = require('./routes/coursesRoute');
const studentsRoute = require('./routes/studentsRoute');

const app = express();

// Body Parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// CORS middleware configuration
app.use(cors({
  origin: 'https://cfrontend-rj10.vercel.app/', // Allow only this frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow certain headers
  credentials: true, // Allow cookies and Authorization headers
}));

// Simple routes for testing
app.get('/', function(req, res) {
    res.send("Peace");
});

app.get('/rj', function(req, res) {
    res.send("loko-loko");
});

// Use the routes for various APIs
app.use('/api/auth', authRoute);
app.use('/api/user', usersRoute);
app.use('/api/dept', departmentsRoute);
app.use('/api/cour', coursesRoute);
app.use('/api/st', studentsRoute);

// Set the server to listen on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//npm start

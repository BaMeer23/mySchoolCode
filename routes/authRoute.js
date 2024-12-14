const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// POST request for registering a user
router.post('/register', register);

// POST request for logging in a user
router.post('/login', login);

module.exports = router;

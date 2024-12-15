const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
const register = async (req, res) => {
    const { fullname, username, passwordx } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(passwordx, 10);
        const [rows] = await pool.query('INSERT INTO users (fullname, username, passwordx) VALUES (?, ?, ?)', [fullname, username, hashedPassword]);

        res.status(201).json({ status: 'success', message: 'Successfully Registered' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Login user and return JWT access and refresh tokens
const login = async (req, res) => {
    const { username, passwordx } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(passwordx, user.passwordx);

        if (!isMatch) {
            return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
        }

        // Generate access token with expiration time from environment variable (default 4 hours)
        const accessTokenExpiresIn = process.env.JWT_ACCESS_EXPIRATION_TIME || '4h';
        const accessToken = jwt.sign(
            { user_id: user.user_id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: accessTokenExpiresIn }
        );

        // Generate refresh token with expiration time from environment variable (default 12 hours)
        const refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRATION_TIME || '12h';
        const refreshToken = jwt.sign(
            { user_id: user.user_id, username: user.username },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: refreshTokenExpiresIn }
        );

        // Optionally, store the refresh token in the database or HTTP-only cookies for security

        res.json({
            status: 'success',
            accessToken,
            refreshToken
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = { register, login };

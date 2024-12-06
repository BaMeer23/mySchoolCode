const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, updateProfile } = require('../controllers/usersController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAllUsers);
router.get('/:user_id', authenticateToken, getUserById);
router.post('/', authenticateToken, createUser);
router.put('/:user_id', authenticateToken, updateUser);
router.delete('/:user_id', authenticateToken, deleteUser);

// Profile Update Route
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;

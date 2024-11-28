const express = require('express');
const { getAllCour, getCourById, createCour, updateCour, deleteCour } = require('../controllers/coursesController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes
router.get('/', authenticateToken, getAllCour);
router.get('/:course_id', authenticateToken, getCourById);
router.post('/', authenticateToken, createCour);
router.put('/:course_id', authenticateToken, updateCour);
router.delete('/:course_id', authenticateToken, deleteCour);

module.exports = router;

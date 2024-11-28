const express = require('express');
const { getAllStu, getStuById, createStu, updateStu, deleteStu } = require('../controllers/studentsController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes
router.get('/', authenticateToken, getAllStu);
router.get('/:student_id', authenticateToken, getStuById);
router.post('/', authenticateToken, createStu);
router.put('/:student_id', authenticateToken, updateStu);
router.delete('/:student_id', authenticateToken, deleteStu);

module.exports = router;

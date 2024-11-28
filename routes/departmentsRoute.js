const express = require('express');
const { getAllDe, getDeById, createDe, updateDe, deleteDe } = require('../controllers/departmentsController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes
router.get('/', authenticateToken, getAllDe);
router.get('/:dept_id', authenticateToken, getDeById);
router.post('/', authenticateToken, createDe);
router.put('/:dept_id', authenticateToken, updateDe);
router.delete('/:dept_id', authenticateToken, deleteDe);

module.exports = router;

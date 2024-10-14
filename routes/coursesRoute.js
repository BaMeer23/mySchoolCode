const express = require('express');
const { getAllCour, getCourById, createCour, updateCour, deleteCour} = require('../controllers/coursesController');

const router =  express.Router();

router.get('/', getAllCour);
router.get('/:course_id', getCourById);
router.post('/', createCour);
router.put('/:course_id', updateCour);
router.delete('/:course_id', deleteCour);

module.exports = router;
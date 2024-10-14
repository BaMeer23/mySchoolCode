const express = require('express');
const { getAllStu, getStuById, createStu, updateStu, deleteStu} = require('../controllers/studentsController');

const router =  express.Router();

router.get('/', getAllStu);
router.get('/:student_id', getStuById);
router.post('/', createStu);
router.put('/:student_id', updateStu);
router.delete('/:student_id', deleteStu);

module.exports = router;
const express = require('express');
const { getAllDe, getDeById, createDe, updateDe, deleteDe} = require('../controllers/departmentsController');


const router =  express.Router();

router.get('/', getAllDe);
router.get('/:dept_id', getDeById);
router.post('/', createDe);
router.put('/:dept_id', updateDe);
router.delete('/:dept_id', deleteDe);

module.exports = router;
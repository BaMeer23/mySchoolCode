const pool = require('../config/database');
const jwt = require('jsonwebtoken');

const getAllStu = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT student_id, lname, fname, mname, user_id, course_id, created_at, updated_at FROM students');
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStuById = async (req, res) => {
  const { student_id } = req.params;

  try {
    const [rows] = await pool.query('SELECT student_id, lname, fname, mname, user_id, course_id,  created_at, updated_at FROM students WHERE student_id = ?', [student_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'The student can not be found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createStu = async (req, res) => {
    const { lname, fname, mname, user_id, course_id } = req.body;
  
    try {
      const [result] = await pool.query('INSERT INTO students (lname, fname, mname, user_id, course_id) VALUES (?, ?, ?, ?, ?)', [lname, fname, mname, user_id, course_id]);
      res.status(201).json({ student_id: result.insertId, lname, fname, mname, user_id, course_id});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const updateStu = async (req, res) => {
    const { student_id } = req.params;
    const { lname, fname, mname, user_id, course_id } = req.body;

   
    try {
      const [result] = await pool.query('UPDATE students SET lname = ?, fname = ?, mname = ?, user_id = ?, course_id = ? WHERE student_id = ?', [lname, fname, mname, user_id, course_id, student_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Can not update, student can not be found' });
      }
  
      res.json({ message: 'Student updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const deleteStu = async (req, res) => {
    const { student_id } = req.params;

   
  
    try {
      const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [student_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Student can not be found' });
      }
  
      res.json({ message: 'The Student has been deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { getAllStu, getStuById, createStu, updateStu, deleteStu };
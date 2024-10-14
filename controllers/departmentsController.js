const pool = require('../config/database');

const getAllDe = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT dept_id, dept_code, dept_name, user_id, created_at, updated_at FROM departments');
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDeById = async (req, res) => {
  const { dept_id } = req.params;

  try {
    const [rows] = await pool.query('SELECT dept_id, dept_code, dept_name, user_id, created_at, updated_at FROM departments WHERE dept_id = ?', [dept_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'The department can not be found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createDe = async (req, res) => {
    const { dept_code, dept_name, user_id } = req.body;
  
    try {
      const [result] = await pool.query('INSERT INTO departments (dept_code, dept_name, user_id) VALUES (?, ?, ?)', [dept_code , dept_name, user_id]);
      res.status(201).json({ dept_id: result.insertId, dept_code, dept_name, user_id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const updateDe = async (req, res) => {
    const { dept_id } = req.params;
    const { dept_code, dept_name, user_id } = req.body;
      
    try {
      const [result] = await pool.query('UPDATE departments SET dept_code = ?, dept_name = ?, user_id = ? WHERE dept_id = ?', [dept_code, dept_name, user_id, dept_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Can not update, department can not be found' });
      }
  
      res.json({ message: 'Department updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const deleteDe = async (req, res) => {
    const { dept_id } = req.params;


    try {
      const [result] = await pool.query('DELETE FROM departments WHERE dept_id = ?', [dept_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Department can not be found' });
      }
  
      res.json({ message: 'The department has been deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { getAllDe, getDeById, createDe, updateDe, deleteDe };
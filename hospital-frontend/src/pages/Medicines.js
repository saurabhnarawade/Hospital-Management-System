// src/pages/Medicine.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/medicines');
      const sortedMedicines = response.data.sort((a, b) => a.id - b.id);
      setMedicines(sortedMedicines);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await axios.put(`http://localhost:8080/api/medicines/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:8080/api/medicines', formData);
      }
      setFormData({ name: '', type: '' });
      fetchMedicines();
    } catch (error) {
      console.error('Error saving medicine:', error);
    }
  };

  const handleEdit = (medicine) => {
    setFormData({ name: medicine.name, type: medicine.type });
    setEditingId(medicine.id);
  };

  const handleDelete = async (id, name) => {
    try {
      await axios.delete(`http://localhost:8080/api/medicines/${id}`);
      alert(`Medicine '${name}' successfully deleted`);
      fetchMedicines();
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-success">Medicine Management</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-light">
        <div className="form-group mb-3">
          <label>Medicine Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Medicine Type</label>
          <input
            type="text"
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {editingId !== null ? 'Update Medicine' : 'Add Medicine'}
        </button>
      </form>

      <h4 className="mt-5 text-primary">Medicines List</h4>
      <table className="table table-bordered table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td>{medicine.id}</td>
              <td>{medicine.name}</td>
              <td>{medicine.type}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(medicine)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(medicine.id, medicine.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medicine;

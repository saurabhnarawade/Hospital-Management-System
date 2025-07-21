// DoctorPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorData, setDoctorData] = useState({
    name: "",
    specialization: "",
  });
  const [editingDoctorId, setEditingDoctorId] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/doctors");
      const sortedDoctors = response.data.sort((a, b) => a.id - b.id);
      setDoctors(sortedDoctors); // Use the sorted list here
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDoctorId) {
        await axios.put(
          `http://localhost:8080/api/doctors/${editingDoctorId}`,
          doctorData
        );
        alert("Doctor updated successfully");
        setEditingDoctorId(null);
      } else {
        await axios.post("http://localhost:8080/api/doctors", doctorData);
        alert("Doctor added successfully");
      }
      setDoctorData({ name: "", specialization: "" });
      fetchDoctors();
    } catch (error) {
      console.error("Error submitting doctor:", error);
    }
  };

  const handleEdit = (doctor) => {
    setDoctorData({ name: doctor.name, specialization: doctor.specialization });
    setEditingDoctorId(doctor.id);
  };

  const handleDelete = async (id, name) => {
    try {
      await axios.delete(`http://localhost:8080/api/doctors/${id}`);
      alert(`Doctor with name ${name} successfully deleted`);
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Doctor Management</h2>
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="border p-3 rounded shadow">
            <div className="form-group">
              <label>Doctor Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={doctorData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Specialization</label>
              <input
                type="text"
                className="form-control"
                name="specialization"
                value={doctorData.specialization}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              {editingDoctorId ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>
        </div>

        <div className="col-md-8">
          <h4 className="mb-3">Doctor List</h4>
          <table className="table table-striped table-bordered shadow">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.id}</td>
                  <td>{doc.name}</td>
                  <td>{doc.specialization}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(doc)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(doc.id, doc.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;

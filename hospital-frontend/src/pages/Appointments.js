import React, { useEffect, useState } from "react";
import axios from "axios";
// import { FaEdit, FaTrash } from 'react-icons/fa';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/appointments"
      );
      const sorted = response.data.sort((a, b) => a.id - b.id);
      setAppointments(sorted);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/doctors");
      const sorted = response.data.sort((a, b) => a.id - b.id);
      setDoctors(sorted);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  // Add or Update Appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      date: dateTime,
      doctorId: selectedDoctorId,
      patientName,
    };

    try {
      if (editId === null) {
        await axios.post(
          "http://localhost:8080/api/appointments",
          appointmentData
        );
      } else {
        await axios.put(
          `http://localhost:8080/api/appointments/${editId}`,
          appointmentData
        );
      }
      fetchAppointments();
      setDateTime("");
      setSelectedDoctorId("");
      setPatientName("");
      setEditId(null);
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  // Edit
  const handleEdit = (appt) => {
    setEditId(appt.id);
    setDateTime(appt.date);
    setSelectedDoctorId(appt.doctorId);
    setPatientName(appt.patientName);
  };

  // Delete
  const handleDelete = async (id, name) => {
    try {
      await axios.delete(`http://localhost:8080/api/appointments/${id}`);
      alert(`Appointment for patient "${name}" successfully deleted`);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm mb-4">
        <h4 className="mb-3 text-primary">Appointment Management</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Date & Time</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., 13-07-2025 2:30PM"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-4">
              <label>Doctor</label>
              <select
                className="form-control"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-4">
              <label>Patient Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-2">
            {editId === null ? "Add Appointment" : "Update Appointment"}
          </button>
        </form>
      </div>

      <div className="card p-4 shadow-sm">
        <h5 className="mb-3 text-info">Appointments List</h5>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Doctor ID</th>
              <th>Patient</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.date}</td>
                <td>{appt.doctorId}</td>
                <td>{appt.patientName}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(appt)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(appt.id, appt.patientName)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;

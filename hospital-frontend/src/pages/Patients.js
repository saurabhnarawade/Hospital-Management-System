import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: { street: '', city: '', state: '', zip: '' },
    doctor: { id: '' },
    medicines: []
  });
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch data
  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchMedicines();
  }, []);

  const fetchPatients = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/patients');
    const sortedPatients = response.data.sort((a, b) => a.id - b.id);
    setPatients(sortedPatients); // Use sorted data
  } catch (error) {
    console.error('Error fetching patients:', error);
  }
};

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  const fetchMedicines = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/medicines');
      setMedicines(res.data);
    } catch (err) {
      console.error('Error fetching medicines:', err);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['street', 'city', 'state', 'zip'].includes(name)) {
      setFormData({ ...formData, address: { ...formData.address, [name]: value } });
    } else if (name === 'doctor') {
      setFormData({ ...formData, doctor: { id: value } });
    } else if (name === 'medicines') {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => ({
        id: option.value
      }));
      setFormData({ ...formData, medicines: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate && currentId) {
        await axios.put(`http://localhost:8080/api/patients/${currentId}`, formData);
      } else {
        await axios.post('http://localhost:8080/api/patients', formData);
      }
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: { street: '', city: '', state: '', zip: '' },
        doctor: { id: '' },
        medicines: []
      });
      setIsUpdate(false);
      setCurrentId(null);
      fetchPatients();
    } catch (err) {
      console.error('Error saving patient:', err);
    }
  };

  // Delete
  const handleDelete = async (id, name) => {
    try {
      await axios.delete(`http://localhost:8080/api/patients/${id}`);
      alert(`Patient with name ${name} successfully deleted`);
      fetchPatients();
    } catch (err) {
      console.error('Error deleting patient:', err);
    }
  };

  // Update
  const handleEdit = (patient) => {
    setFormData({
      name: patient.name,
      phone: patient.phone,
      email: patient.email,
      address: {
        street: patient.address?.street || '',
        city: patient.address?.city || '',
        state: patient.address?.state || '',
        zip: patient.address?.zip || ''
      },
      doctor: { id: patient.doctor?.id || '' },
      medicines: patient.medicines.map(med => ({ id: med.id }))
    });
    setIsUpdate(true);
    setCurrentId(patient.id);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">{isUpdate ? 'Update Patient' : 'Add Patient'}</h2>
      <form className="border p-4 shadow rounded" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-4">
            <label>Phone</label>
            <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-4">
            <label>Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <h5 className="mt-4">Address</h5>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Street</label>
            <input type="text" className="form-control" name="street" value={formData.address.street} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-3">
            <label>City</label>
            <input type="text" className="form-control" name="city" value={formData.address.city} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-3">
            <label>State</label>
            <input type="text" className="form-control" name="state" value={formData.address.state} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-3">
            <label>Zip</label>
            <input type="text" className="form-control" name="zip" value={formData.address.zip} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Doctor</label>
          <select className="form-control" name="doctor" value={formData.doctor.id} onChange={handleChange} required>
            <option value="">Select Doctor</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Medicines</label>
          <select multiple className="form-control" name="medicines" onChange={handleChange} value={formData.medicines.map(m => m.id.toString())}>
            {medicines.map(med => (
              <option key={med.id} value={med.id}>{med.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className={`btn ${isUpdate ? 'btn-warning' : 'btn-success'} mt-3`}>
          {isUpdate ? 'Update Patient' : 'Add Patient'}
        </button>
      </form>

      <hr className="my-5" />
      <h3 className="text-info">Patients List</h3>
      <table className="table table-bordered table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Doctor</th>
            <th>Medicines</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.phone}</td>
              <td>{patient.email}</td>
              <td>{patient.doctor?.name}</td>
              <td>{patient.medicines.map(m => m.name).join(', ')}</td>
              <td>
                <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(patient)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(patient.id, patient.name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;

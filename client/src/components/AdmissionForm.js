import React, { useState } from 'react';
import './AdmissionForm.css';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    age: '',
    selectedBatch: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setErrorMessage(''); // Clear previous error messages
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if any field is empty
  if (!formData.name || !formData.contactNumber || !formData.age || !formData.selectedBatch) {
    setErrorMessage('All fields are required. Please fill out the entire form.');
    return;
  }

  // Basic validation
  if (!/^[a-zA-Z]+$/.test(formData.name)) {
    setErrorMessage('Name should contain only letters.');
    return;
  }

  if (!/^\d+$/.test(formData.contactNumber)) {
    setErrorMessage('Contact number should contain only numbers.');
    return;
  }

  const age = parseInt(formData.age);
  if (isNaN(age) || age < 18 || age > 65) {
    setErrorMessage('Age should be between 18 and 65.');
    return;
  }

  try {
    // Make API request to the backend
    const response = await fetch('http://localhost:3003/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('User registered successfully');
      // You can redirect or perform additional actions upon successful registration
    } else {
      console.error('Failed to register user');
      setErrorMessage('Failed to register user. Please try again.');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    setErrorMessage('An unexpected error occurred. Please try again.');
  };
};

  

  return (
    <div>
      <h1>Yoga Class Admission Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Select Batch:</label>
          <select
            name="selectedBatch"
            value={formData.selectedBatch}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </div>

        <div>
          <p>
            Note: You can change batches any time within the same month in which you enrolled.
          </p>
        </div>

        <div>
          <button type="submit"  onClick={handleSubmit}>Submit</button>
        </div>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AdmissionForm;

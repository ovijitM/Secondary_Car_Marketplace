import React, { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    carBrand: '',
    carModel: '',
    carNumber: '',
    services: [],
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'services') {
      // Toggle selection in an array for multi-select
      let servicesArray = [...formData.services];
      if (servicesArray.includes(value)) {
        servicesArray = servicesArray.filter(service => service !== value);
      } else {
        servicesArray.push(value);
      }
      setFormData({ ...formData, services: servicesArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', padding: '20px', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <input type="text" name="name" placeholder="Name *" required onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone *" required onChange={handleChange} />
      <input type="date" name="date" required onChange={handleChange} />
      <input type="text" name="carBrand" placeholder="Car Brand *" required onChange={handleChange} />
      <input type="text" name="carModel" placeholder="Car Model *" required onChange={handleChange} />
      <input type="text" name="carNumber" placeholder="Car Number *" required onChange={handleChange} />
      <select name="services" multiple onChange={handleChange} style={{ height: '100px' }}>
        <option value="Emergency Service">Emergency Service</option>
        <option value="Wheel Alignment">Wheel Alignment</option>
        <option value="Brake Service">Brake Service</option>
        <option value="Car AC Service">Car AC Service</option>
      </select>
      <textarea name="notes" placeholder="Additional Notes" onChange={handleChange} />
      <button type="submit" style={{ background: 'skyblue', color: 'white', padding: '10px', borderRadius: '8px' }}>Submit</button>
    </form>
  );
};

export default BookingForm;

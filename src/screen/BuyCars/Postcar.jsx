
import React, { useState } from "react";
import "./Postcar.css";

export default function Postcar() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: null,
    mileage: "",
    color: "",
    price: null,
    description: "",
    image: null,
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you can add logic to send formData to your backend
  };

  return (
    <>
      <div className="car-form-container">
        <h1 className="form-title">Post a Car</h1>
        <form id="car-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label htmlFor="make" className="form-label">
                Make:
              </label>
              <input
                type="text"
                id="make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="model" className="form-label">
                Model:
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="year" className="form-label">
                Year:
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="mileage" className="form-label">
                Mileage:
              </label>
              <input
                type="text"
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="color" className="form-label">
                Color:
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
              ></textarea>
            </div>
            <div>
              <label htmlFor="image" className="form-label">
                Image Upload:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="form-input"
              />
            </div>
            <h2 className="section-title">Contact Information</h2>
            <div>
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="phone" className="form-label">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Post Car
          </button>
        </form>
      </div>
    </>
  );
}

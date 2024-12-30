import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/services')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch services');
        }
        return res.json();
      })
      .then((data) => {
        setServices(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="services-grid">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;

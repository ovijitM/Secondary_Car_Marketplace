import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CustomNavbar from '../../components/Customnavbar/Customnavbar';
import ServiceCard from '../../components/ServiceCard';
import CarPartsList from '../../components/CarPartsList';

const RepairPage = () => {
  const [services, setServices] = useState([]); // Combined services (frontend + backend)
  const [carParts, setCarParts] = useState([
    { id: 1, name: 'Brake Pads', image: 'src/assets/repair/engines.jpg', price: '50' },
    { id: 2, name: 'Headlights', image: '/path/to/headlights.jpg', price: '100' },
    { id: 3, name: 'Car Battery', image: '/path/to/car_battery.jpg', price: '120' },
    { id: 4, name: 'Windshield Wipers', image: '/path/to/windshield_wipers.jpg', price: '30' },
    { id: 5, name: 'Air Filters', image: '/path/to/air_filters.jpg', price: '25' },
    { id: 6, name: 'Alternator', image: '/path/to/alternator.jpg', price: '200' },
    { id: 7, name: 'Spark Plugs', image: '/path/to/spark_plugs.jpg', price: '40' }
  ]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Frontend predefined services
  const frontendServices = [
    { id: 1, name: 'Engine Repair', description: 'Fix engine issues such as overheating, oil leaks, or misfiring.', price: 300, available: true },
    { id: 2, name: 'Tire Replacement', description: 'Replace worn-out or damaged tires with new ones.', price: 100, available: true },
    { id: 3, name: 'Brake Replacement', description: 'Change brake pads or repair brake systems to ensure safety.', price: 150, available: false },
    { id: 4, name: 'Oil Change', description: 'Change the oil to keep the engine running smoothly.', price: 50, available: true },
    { id: 5, name: 'Battery Replacement', description: 'Replace old batteries with new ones to ensure reliable starts.', price: 120, available: true }
  ];

  // Fetch backend services and combine with frontend services
  useEffect(() => {
    fetch('http://localhost:8000/api/services')
      .then((response) => response.json())
      .then((fetchedServices) => {
        const combinedServices = [...frontendServices, ...fetchedServices];
        setServices(combinedServices); // Update the state with the combined services
      })
      .catch((err) => {
        console.error('Failed to fetch services:', err);
        setError('Failed to fetch services'); // Handle error if fetch fails
      });
  }, []);

  const handleBookNowClick = () => {
    navigate('/booking');
  };

  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: 'white' }}>
          <h1 style={{ color: 'skyblue', margin: 0 }}>Car Repair</h1>
          <button
            onClick={handleBookNowClick}
            style={{
              padding: '10px 20px',
              backgroundColor: 'skyblue',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Book Now
          </button>
        </div>
        <h2 className="text-center mb-4">Repair Services</h2>
        {error && <p>{error}</p>}
        <div className="services-container">
          {services.map((service) => (
            <ServiceCard key={service.id || service._id} service={service} />
          ))}
        </div>
        <h2 className="text-center mt-4">Car Parts</h2>
        <CarPartsList parts={carParts} />
      </Container>
    </>
  );
};

export default RepairPage;

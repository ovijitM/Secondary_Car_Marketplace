import express from 'express';
import Service from '../dataModels/servicedata.js'; // Ensure path is correct
const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find(); // Fetch all services from the database
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get a specific service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id); // Fetch service by ID
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Create a new service
router.post('/', async (req, res) => {
  try {
    const newService = new Service(req.body); // Create a new service document
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create service' });
  }
});

// Update a service
router.put('/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ error: 'Service not found' });
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update service' });
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;

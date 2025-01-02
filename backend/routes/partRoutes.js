import express from 'express';
import Part from '../dataModels/partdata.js'; // Adjust the path based on your structure

const router = express.Router();

// Middleware for validation (optional, for advanced use)
const validatePart = (req, res, next) => {
  const { name, image, price } = req.body;
  if (!name || !image || !price) {
    return res.status(400).json({ error: 'Name, image, and price are required.' });
  }
  next();
};

// Get all parts
router.get('/', async (req, res) => {
  try {
    const parts = await Part.find();
    res.status(200).json(parts);
  } catch (err) {
    console.error('Error fetching parts:', err);
    res.status(500).json({ error: 'Failed to fetch parts' });
  }
});

// Get a specific part by ID
router.get('/:id', async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ error: 'Part not found' });
    }
    res.status(200).json(part);
  } catch (err) {
    console.error('Error fetching part:', err);
    res.status(500).json({ error: 'Failed to fetch part' });
  }
});

// Create a new part
router.post('/', validatePart, async (req, res) => {
  try {
    const newPart = new Part(req.body);
    await newPart.save();
    res.status(201).json(newPart);
  } catch (err) {
    console.error('Error creating part:', err);
    res.status(400).json({ error: 'Failed to create part' });
  }
});

// Update a part
router.put('/:id', validatePart, async (req, res) => {
  try {
    const updatedPart = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPart) {
      return res.status(404).json({ error: 'Part not found' });
    }
    res.status(200).json(updatedPart);
  } catch (err) {
    console.error('Error updating part:', err);
    res.status(400).json({ error: 'Failed to update part' });
  }
});

// Delete a part
router.delete('/:id', async (req, res) => {
  try {
    const deletedPart = await Part.findByIdAndDelete(req.params.id);
    if (!deletedPart) {
      return res.status(404).json({ error: 'Part not found' });
    }
    res.status(200).json({ message: 'Part deleted successfully', part: deletedPart });
  } catch (err) {
    console.error('Error deleting part:', err);
    res.status(500).json({ error: 'Failed to delete part' });
  }
});

export default router;

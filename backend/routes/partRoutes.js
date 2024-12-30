import express from 'express';
import Part from '../dataModels/partdata.js'; // Adjust the path based on your structure

const router = express.Router();

// Get all parts
router.get('/', async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch parts' });
  }
});

// Get a specific part by ID
router.get('/:id', async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ error: 'Part not found' });
    res.json(part);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch part' });
  }
});

// Create a new part
router.post('/', async (req, res) => {
  try {
    const newPart = new Part(req.body);
    await newPart.save();
    res.status(201).json(newPart);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create part' });
  }
});

// Update a part
router.put('/:id', async (req, res) => {
  try {
    const updatedPart = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPart) return res.status(404).json({ error: 'Part not found' });
    res.json(updatedPart);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update part' });
  }
});

// Delete a part
router.delete('/:id', async (req, res) => {
  try {
    const deletedPart = await Part.findByIdAndDelete(req.params.id);
    if (!deletedPart) return res.status(404).json({ error: 'Part not found' });
    res.json(deletedPart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete part' });
  }
});

export default router;

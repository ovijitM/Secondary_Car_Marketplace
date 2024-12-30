import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: false },
    date: { type: Date, required: true }
});

export default mongoose.model('Booking', bookingSchema);

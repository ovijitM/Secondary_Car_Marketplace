import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model("Part", partSchema);

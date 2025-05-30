import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // <- Add password field
  role: { type: String, enum: ['farmer', 'user'], default: 'user' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);

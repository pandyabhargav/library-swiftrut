
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const mongodb_url = process.env.MONGODB_URI;
console.log('MongoDB URI:', process.env.MONGODB_URI); 


const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;

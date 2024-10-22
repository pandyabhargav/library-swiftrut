import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './Config/mongoose.js';
import authRoutes from './Routes/userRoutes.js';
import bookRoute from './Routes/book.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json()); 


connectDB();


app.use('/api/auth', authRoutes);
app.use('/api', bookRoute);

const port = process.env.PORT;


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

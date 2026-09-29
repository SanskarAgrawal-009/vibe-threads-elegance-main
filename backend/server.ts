import express from 'express';
import mongoose from 'mongoose';
import { productController } from './controllers/productController';
import connectDB from './config/db';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.get('/api/products', productController.getAllProducts);
app.post('/api/products', productController.createProduct);
app.put('/api/products/:id', productController.updateProduct);
app.delete('/api/products/:id', productController.deleteProduct);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vibe Threads Elegance API operational' });
});

// Connect to MongoDB & Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Luxury Backend Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.warn('MongoDB connection not configured or offline. Client app runs in persistent client-store mode.');
  }
};

startServer();

export default app;

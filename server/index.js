
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma.js';

// Route imports
// import authRoutes from './routes/auth.routes';
// import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/categories.js';
// import productRoutes from './routes/product.routes';
// import cartRoutes from './routes/cart.routes';
// import orderRoutes from './routes/order.routes';

// Middleware imports
import { errorHandler } from './middleware/error.middleware.js';
// import { authMiddleware } from './middleware/auth.middleware';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', authMiddleware, userRoutes);
app.use('/api', categoryRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', authMiddleware, cartRoutes);
// app.use('/api/orders', authMiddleware, orderRoutes);

// Error handling
app.use(errorHandler);

// Database connection and server start
async function startServer() {
  try {
    await prisma.$connect();
    console.log('+++++++++++++++++Connected to PostgreSQL database');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  
  
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'E-commerce API is running!',
      version: '1.0.0'
    });
  });

  app.use('/api', apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;
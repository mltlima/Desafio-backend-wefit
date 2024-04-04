import express from 'express';
import profileRoutes from './routes/profileRoutes';
import errorHandler from './middlewares/errorHandlerMiddleware';
import "express-async-errors";

const app = express();

app.use(express.json());

app.use(profileRoutes);
app.use(errorHandler);

export default app;

import express from 'express';
import { PORT } from './config/config.js';
import userRoutes from './routes/user.routes.js';

const app = express();

//Routes
app.use(userRoutes);

app.listen(PORT);
console.log('Server is running on port:', PORT);

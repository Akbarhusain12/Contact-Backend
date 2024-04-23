import dotenv from 'dotenv';
import express from 'express';
import contactRoutes from './routes/contact.routes.js'; 
import errorHandler from './middleware/errorhandler.middleware.js';
const app = express();
dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

app.use(express.json())
app.use('/api/contact', contactRoutes);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

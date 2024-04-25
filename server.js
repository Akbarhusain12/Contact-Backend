import dotenv from 'dotenv';
import express from 'express';
import contactRoutes from './routes/contact.routes.js'; 
import errorHandler from './middleware/errorhandler.middleware.js';
import connectDB from './db/index.js';
import userRoutes from "./routes/user.routes.js"


const app = express();
dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

// connectDB()
app.use(express.json())
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app
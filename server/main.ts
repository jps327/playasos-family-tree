import { getAllData } from './dataFetcher';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.server' }); // eslint-disable-line

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json()); // eslint-disable-line

// Basic route
app.get('/api/data', async (_: Request, res: Response) => {
  const data = await getAllData();
  res.json(data);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

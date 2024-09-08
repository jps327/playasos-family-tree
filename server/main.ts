import { getAllData } from './dataFetcher';
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json()); // eslint-disable-line

// Basic route
app.get('/api/data', (_: Request, res: Response) => {
  res.json(getAllData());
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

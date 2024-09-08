import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json()); // eslint-disable-line

const ELEMENTS = [
  {
    data: { id: 'one', label: 'Node 1', something: 'woah' },
    position: { x: 40, y: 40 },
  },
  {
    data: { id: 'two', label: 'Node 2', something: 'woah2' },
    position: { x: 100, y: 20 },
  },
  { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
];

// Basic route
app.get('/api/data', (_: Request, res: Response) => {
  res.json(ELEMENTS);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

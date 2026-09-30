import express, { type NextFunction, type Request, type Response } from 'express';
import mongoose from 'mongoose';
import { apiBaseUrl } from './config/api.js';
import { createResourceRouter } from './routes/resources.js';

const app = express();
const port = 8000;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.use('/api/users', createResourceRouter('users'));
app.use('/api/teams', createResourceRouter('teams'));
app.use('/api/activities', createResourceRouter('activities'));
app.use('/api/leaderboard', createResourceRouter('leaderboard'));
app.use('/api/workouts', createResourceRouter('workouts'));

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiBaseUrl,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});

mongoose.connect(connectionString)
  .then(() => {
    app.listen(port, () => console.log(`OctoFit API listening at ${apiBaseUrl}`));
  })
  .catch((error: unknown) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
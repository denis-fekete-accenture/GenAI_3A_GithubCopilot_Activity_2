import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT) || 8000;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

mongoose.connect(connectionString)
  .then(() => {
    app.listen(port, () => console.log(`OctoFit API listening on port ${port}`));
  })
  .catch((error: unknown) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
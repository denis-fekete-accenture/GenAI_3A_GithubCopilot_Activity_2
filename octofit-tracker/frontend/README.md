# OctoFit Tracker

React 19 and Vite presentation tier for the OctoFit Tracker. The app uses Bootstrap and React Router. The Status page queries the Express API through Vite's `/api` proxy.

Start MongoDB locally on port 27017, then run the following commands from the workspace root in separate terminals:

```bash
npm install --prefix octofit-tracker/backend
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/backend
npm run dev --prefix octofit-tracker/frontend
```

Open `http://localhost:5173/`. The API listens on `http://localhost:8000/api/health` and connects to `mongodb://localhost:27017/octofit_db` by default. Set `MONGODB_URI` to override the database connection.

Run `npm run build --prefix octofit-tracker/backend` and `npm run build --prefix octofit-tracker/frontend` to build each tier.

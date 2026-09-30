# OctoFit Tracker

React 19 and Vite presentation tier for the OctoFit Tracker. The app uses Bootstrap and React Router. Collection pages query the Express API with Codespaces-aware URLs.

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when running in Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API requests use `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. When it is unset, the app safely falls back to `/api/[component]/` for local development through the Vite proxy instead of building an `https://undefined-8000...` URL.

Start MongoDB locally on port 27017, then run the following commands from the workspace root in separate terminals:

```bash
npm install --prefix octofit-tracker/backend
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/backend
npm run dev --prefix octofit-tracker/frontend
```

Open `http://localhost:5173/`. The API listens on `http://localhost:8000/api/health` and connects to `mongodb://localhost:27017/octofit_db` by default. Set `MONGODB_URI` to override the database connection.

Run `npm run build --prefix octofit-tracker/backend` and `npm run build --prefix octofit-tracker/frontend` to build each tier.

import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import { apiMode, buildApiUrl } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function Status() {
  const [status, setStatus] = useState('Checking API...')

  useEffect(() => {
    const controller = new AbortController()

    fetch(buildApiUrl('health'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        return response.json()
      })
      .then((data) => setStatus(`API online - Database ${data.database} - ${apiMode}`))
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('API unavailable')
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="content container py-5">
      <p className="eyebrow">System</p>
      <h1>Service status</h1>
      <p className="status-line" role="status">{status}</p>
    </section>
  )
}

function App() {
  return (
    <>
      <header className="site-header">
        <nav className="container d-flex align-items-center justify-content-between py-3" aria-label="Main navigation">
          <NavLink to="/" className="brand d-flex align-items-center gap-2 text-decoration-none">
            <img src={logo} alt="" width="40" height="40" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <div className="d-flex gap-4">
            <NavLink to="/" end className="nav-item">Home</NavLink>
            <NavLink to="/users" className="nav-item">Users</NavLink>
            <NavLink to="/teams" className="nav-item">Teams</NavLink>
            <NavLink to="/activities" className="nav-item">Activities</NavLink>
            <NavLink to="/leaderboard" className="nav-item">Leaderboard</NavLink>
            <NavLink to="/workouts" className="nav-item">Workouts</NavLink>
            <NavLink to="/status" className="nav-item">Status</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <section className="content container py-5">
              <p className="eyebrow">Training workspace</p>
              <h1>OctoFit Tracker</h1>
              <p className="intro">Your place for activity, teams, and progress.</p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <NavLink to="/users" className="btn btn-dark">View users</NavLink>
                <NavLink to="/activities" className="btn btn-outline-dark">View activities</NavLink>
              </div>
            </section>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </main>
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'

function Status() {
  const [status, setStatus] = useState('Checking API...')

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/health', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        return response.json()
      })
      .then((data) => setStatus(`API online - Database ${data.database}`))
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
              <NavLink to="/status" className="btn btn-dark mt-4">View service status</NavLink>
            </section>
          } />
          <Route path="/status" element={<Status />} />
        </Routes>
      </main>
    </>
  )
}

export default App

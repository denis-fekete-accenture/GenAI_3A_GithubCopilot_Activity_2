import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('Loading teams...')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection('teams', controller.signal)
      .then((records) => {
        setTeams(records)
        setStatus(records.length ? '' : 'No teams found.')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('Unable to load teams.')
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="content container py-5">
      <p className="eyebrow">Groups</p>
      <h1>Teams</h1>
      {status && <p className="status-line" role="status">{status}</p>}
      <div className="resource-grid mt-4">
        {teams.map((team) => (
          <article className="resource-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <p>{team.city}</p>
            <span>{team.weeklyGoalMinutes} weekly goal minutes</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams
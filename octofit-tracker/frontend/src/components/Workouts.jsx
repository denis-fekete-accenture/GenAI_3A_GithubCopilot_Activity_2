import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('Loading workouts...')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection('workouts', controller.signal)
      .then((records) => {
        setWorkouts(records)
        setStatus(records.length ? '' : 'No workouts found.')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('Unable to load workouts.')
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="content container py-5">
      <p className="eyebrow">Suggestions</p>
      <h1>Workouts</h1>
      {status && <p className="status-line" role="status">{status}</p>}
      <div className="resource-grid mt-4">
        {workouts.map((workout) => (
          <article className="resource-card" key={workout._id ?? workout.title}>
            <h2>{workout.title}</h2>
            <p>{workout.focusArea} · {workout.difficulty}</p>
            <span>{workout.durationMinutes} minutes</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts
import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('Loading activities...')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection('activities', controller.signal)
      .then((records) => {
        setActivities(records)
        setStatus(records.length ? '' : 'No activities found.')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('Unable to load activities.')
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="content container py-5">
      <p className="eyebrow">Training log</p>
      <h1>Activities</h1>
      {status && <p className="status-line" role="status">{status}</p>}
      <div className="resource-grid mt-4">
        {activities.map((activity) => (
          <article className="resource-card" key={activity._id ?? `${activity.userName}-${activity.activityDate}`}>
            <h2>{activity.type}</h2>
            <p>{activity.userName} · {activity.teamName}</p>
            <span>{activity.durationMinutes} min · {activity.caloriesBurned} cal</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities
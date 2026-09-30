import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('Loading users...')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection('users', controller.signal)
      .then((records) => {
        setUsers(records)
        setStatus(records.length ? '' : 'No users found.')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('Unable to load users.')
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="content container py-5">
      <p className="eyebrow">Profiles</p>
      <h1>Users</h1>
      {status && <p className="status-line" role="status">{status}</p>}
      <div className="resource-grid mt-4">
        {users.map((user) => (
          <article className="resource-card" key={user._id ?? user.username}>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>{user.email}</p>
            <span>{user.teamName}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users
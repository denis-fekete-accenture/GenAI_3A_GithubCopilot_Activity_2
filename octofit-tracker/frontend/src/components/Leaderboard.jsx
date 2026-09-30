import { useEffect, useState } from 'react'
import { fetchCollectionFromUrl } from '../api.js'

const leaderboardUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('Loading leaderboard...')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollectionFromUrl(leaderboardUrl, controller.signal)
      .then((records) => {
        setEntries(records)
        setStatus(records.length ? '' : 'No leaderboard entries found.')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('Unable to load leaderboard.')
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="content container py-5">
      <p className="eyebrow">Standings</p>
      <h1>Leaderboard</h1>
      {status && <p className="status-line" role="status">{status}</p>}
      <div className="table-responsive mt-4">
        <table className="table align-middle leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id ?? `${entry.rank}-${entry.userName}`}>
                <td>{entry.rank}</td>
                <td>{entry.userName}</td>
                <td>{entry.teamName}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
import { useCallback, useEffect, useState } from 'react'
import { ApiError, getJobs, getStats, type Job, type Me, type Stats } from '../api'
import CreateSandboxForm from './CreateSandboxForm'
import EnvironmentsTable from './EnvironmentsTable'
import Sidebar from './Sidebar'
import StatsRow from './StatsRow'
import Topbar from './Topbar'

const POLL_MS = 4000

type Props = { me: Me; onSignOut: () => void; onSessionExpired: () => void }

export default function Dashboard({ me, onSignOut, onSessionExpired }: Props) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    try {
      const [nextJobs, nextStats] = await Promise.all([getJobs(), me.is_admin ? getStats() : null])
      setJobs(nextJobs)
      setStats(nextStats)
      setError('')
    } catch (failure) {
      if (failure instanceof ApiError && failure.status === 401) onSessionExpired()
      else setError(failure instanceof Error ? failure.message : 'Could not load sandboxes')
    }
  }, [me.is_admin, onSessionExpired])

  useEffect(() => {
    const load = () => void refresh()
    load()
    const timer = setInterval(load, POLL_MS)
    return () => clearInterval(timer)
  }, [refresh])

  return (
    <section className="sb-dashboard">
      <Sidebar />
      <div>
        <Topbar userName={me.display_name} onSignOut={onSignOut} />
        <div className="sb-content">
          <div className="sb-kicker">YOUR DEVELOPMENT PLAYGROUND</div>
          <h2>Odoo Sandboxes</h2>
          <p>A fresh environment for every idea. Upload your addon and start testing.</p>
          {stats && <StatsRow stats={stats} />}
          <CreateSandboxForm onCreated={refresh} />
          {error && <p className="sb-error" role="alert">{error}</p>}
          <EnvironmentsTable jobs={jobs} me={me} onChanged={refresh} onError={setError} />
          <div className="sb-foot sb-note"><span>Odoo Sandbox · Made for experimentation</span><span>18.0 / 19.0 / 20.0</span></div>
        </div>
      </div>
    </section>
  )
}

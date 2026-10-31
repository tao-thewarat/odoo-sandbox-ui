import { runJobAction, type Job, type JobAction, type Me } from '../api'

const ACTIONS: Record<string, JobAction[]> = {
  ready: ['stop', 'delete'],
  stopped: ['start', 'delete'],
  failed: ['delete'],
  queued: ['delete'],
}

const BADGES: Record<string, string> = {
  ready: 'sb-ready',
  stopped: 'sb-stopped',
  failed: 'sb-failed',
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

type Props = { jobs: Job[]; me: Me; onChanged: () => void; onError: (message: string) => void }

export default function EnvironmentsTable({ jobs, me, onChanged, onError }: Props) {
  async function run(job: Job, action: JobAction) {
    try {
      await runJobAction(job.id, action)
      onChanged()
    } catch (failure) {
      onError(failure instanceof Error ? failure.message : `Could not ${action} the sandbox`)
    }
  }

  return (
    <div className="sb-panel">
      <div className="sb-panelhead">Environments</div>
      <div className="sb-tablewrap">
        <table>
          <thead>
            <tr><th>ENVIRONMENT</th><th>VERSION</th><th>STATUS</th><th>ACTIONS</th></tr>
          </thead>
          <tbody>
            {jobs.length === 0 && <tr><td colSpan={4} className="sb-note">No sandboxes yet.</td></tr>}
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>
                  {job.name ?? job.id.slice(0, 8)}
                  <small>{job.id.slice(0, 8)} · {new Date(job.created_at).toLocaleString()}{job.owner ? ` · ${job.owner}` : ''}</small>
                </td>
                <td>{job.odoo_version}<small>{capitalize(job.edition)}</small></td>
                <td>
                  <span className={`sb-badge ${BADGES[job.status] ?? ''}`}>{capitalize(job.status.replace('_', ' '))}</span>
                  {job.error && <small className="sb-error">{job.error}</small>}
                </td>
                <td>
                  {job.url && job.status === 'ready' && <a className="sb-open" href={job.url} target="_blank" rel="noopener noreferrer">Open ↗</a>}{' '}
                  {(me.is_admin || job.owner === me.user) && ACTIONS[job.status]?.map((action) => (
                    <button key={action} type="button" onClick={() => run(job, action)}>{capitalize(action)}</button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

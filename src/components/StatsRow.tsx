import type { Stats } from '../api'

export default function StatsRow({ stats }: { stats: Stats }) {
  return (
    <div className="sb-stats">
      <div className="sb-stat"><div className="sb-note">Total environments</div><div className="sb-value">{stats.environments}</div></div>
    </div>
  )
}

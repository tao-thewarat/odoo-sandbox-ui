export default function Topbar({ userName, onSignOut }: { userName: string; onSignOut: () => void }) {
  return (
    <header className="sb-top">
      <span style={{ color: 'var(--soft)' }}>Workspace &nbsp; / &nbsp; <span style={{ color: 'var(--ink)' }}>Sandboxes</span></span>
      <div className="sb-user">
        <span className="sb-avatar">{userName.charAt(0).toUpperCase()}</span>
        <span>{userName}</span>
        <button className="sb-signout" type="button" onClick={onSignOut}>Sign out</button>
      </div>
    </header>
  )
}

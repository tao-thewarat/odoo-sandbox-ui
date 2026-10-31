import { useState } from 'react'

function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <section className="sb-login">
      <div className="sb-login-inner">
        <h1 className="sb-brand"><img className="sb-logo" src="/icon.png" alt="" />Odoo Sandbox</h1>
        <p>Spin up a clean Odoo environment. Test your addons.</p>
        <button className="sb-ms" type="button" onClick={onLogin}>
          <span className="sb-msmark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          Continue with Microsoft
        </button>
      </div>
    </section>
  )
}

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  return (
    <section className="sb-dashboard">
      <aside>
        <div className="sb-brand"><img className="sb-logo" src="/icon.png" alt="" />Sandbox /</div>
        <div className="sb-nav-label">WORKSPACE</div>
        <div className="sb-nav">▦ &nbsp; Sandboxes</div>
        <div className="sb-sidebottom sb-note">A little space to experiment.<br />Build. Test. Start again.</div>
      </aside>
      <div>
        <header className="sb-top">
          <span style={{ color: 'var(--soft)' }}>Workspace &nbsp; / &nbsp; <span style={{ color: 'var(--ink)' }}>Sandboxes</span></span>
          <div className="sb-user">
            <span className="sb-avatar">T</span>
            <span>Tao</span>
            <button className="sb-signout" type="button" onClick={onSignOut}>Sign out</button>
          </div>
        </header>
        <div className="sb-content">
          <div className="sb-kicker">YOUR DEVELOPMENT PLAYGROUND</div>
          <h2>Odoo Sandboxes</h2>
          <p>A fresh environment for every idea. Upload your addon and start testing.</p>
          <div className="sb-stats">
            <div className="sb-stat"><div className="sb-note">Environments</div><div className="sb-value">3</div></div>
            <div className="sb-stat"><div className="sb-note">Ready to explore</div><div className="sb-value">1</div></div>
            <div className="sb-stat"><div className="sb-note">Lifetime</div><div className="sb-value">2 <span style={{ fontSize: 12, color: 'var(--soft)' }}>hours</span></div></div>
          </div>
          <div className="sb-panel">
            <div className="sb-panelhead">Create a sandbox <span className="sb-note">UPLOAD &amp; LAUNCH</span></div>
            <div className="sb-form">
              <label>Odoo version
                <select aria-label="Odoo version" defaultValue="19.0">
                  <option>20.0</option>
                  <option>19.0</option>
                  <option>18.0</option>
                </select>
              </label>
              <label>Edition
                <select aria-label="Odoo edition" defaultValue="Enterprise">
                  <option>Community</option>
                  <option>Enterprise</option>
                </select>
              </label>
              <label>Your addon
                <span className="sb-upload">
                  <span>Choose an addon ZIP</span>
                  <input type="file" accept=".zip" aria-label="Choose addon ZIP" />
                </span>
              </label>
              <button className="sb-primary" type="button">Create sandbox ↗</button>
            </div>
            <div className="sb-tip">Sandbox login: admin / admin</div>
          </div>
          <div className="sb-panel">
            <div className="sb-panelhead">Your environments <span className="sb-note">Sample data</span></div>
            <div className="sb-tablewrap">
              <table>
                <thead>
                  <tr><th>ENVIRONMENT</th><th>VERSION</th><th>STATUS</th><th>ACTIONS</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>purchase_advance_payment<small>dd697181 · Created just now</small></td>
                    <td>19.0<small>Enterprise</small></td>
                    <td><span className="sb-badge sb-ready">● Ready</span></td>
                    <td><button type="button" className="sb-link">Open ↗</button> <button type="button">Stop</button></td>
                  </tr>
                  <tr>
                    <td>l10n_th_base_sequence<small>2528c37d · Created 12 min ago</small></td>
                    <td>20.0<small>Community</small></td>
                    <td><span className="sb-badge">◌ Installing</span></td>
                    <td><span className="sb-note">Starting up…</span></td>
                  </tr>
                  <tr>
                    <td>sale_order_line_note<small>e814c20a · Created 1 hour ago</small></td>
                    <td>20.0<small>Community</small></td>
                    <td><span className="sb-badge sb-stopped">Stopped</span></td>
                    <td><button type="button">Start</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="sb-foot sb-note"><span>Odoo Sandbox · Made for experimentation</span><span>18.0 / 19.0 / 20.0</span></div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  // ponytail: login is mock state, lost on reload; replace with real Microsoft OAuth session
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div id="sbx-preview">
      <div className="sb-window">
        {loggedIn
          ? <Dashboard onSignOut={() => setLoggedIn(false)} />
          : <Login onLogin={() => setLoggedIn(true)} />}
      </div>
    </div>
  )
}

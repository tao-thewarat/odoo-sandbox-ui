import { useCallback, useEffect, useState } from 'react'
import { getMe, logout, type Me } from './api'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

export default function App() {
  // undefined: still checking the session; null: signed out
  const [me, setMe] = useState<Me | null | undefined>(undefined)
  const clearSession = useCallback(() => setMe(null), [])

  useEffect(() => {
    getMe().then(setMe, clearSession)
  }, [clearSession])

  if (me === undefined) return null

  return (
    <div id="sbx-preview">
      <div className="sb-window">
        {me
          ? <Dashboard me={me} onSignOut={() => logout().finally(clearSession)} onSessionExpired={clearSession} />
          : <Login />}
      </div>
    </div>
  )
}

import { useState, type FormEvent } from 'react'
import { createJob } from '../api'

export default function CreateSandboxForm({ onCreated }: { onCreated: () => void }) {
  const [fileName, setFileName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setUploading(true)
    setError('')
    try {
      await createJob(new FormData(form))
      form.reset()
      setFileName('')
      onCreated()
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form className="sb-panel" onSubmit={submit}>
      <div className="sb-panelhead">Create a sandbox <span className="sb-note">UPLOAD &amp; LAUNCH</span></div>
      <div className="sb-form">
        <label>Odoo version
          <select name="odoo_version" defaultValue="20.0">
            <option>20.0</option>
            <option>19.0</option>
            <option>18.0</option>
          </select>
        </label>
        <label>Edition
          <select name="edition" defaultValue="enterprise">
            <option value="community">Community</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </label>
        <label>Your addon
          <span className="sb-upload">
            <span>{fileName || 'Choose an addon ZIP'}</span>
            <input
              type="file"
              name="addon_zip"
              accept=".zip"
              required
              aria-label="Choose addon ZIP"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
            />
          </span>
        </label>
        <button className="sb-primary" disabled={uploading}>{uploading ? 'Uploading…' : 'Create sandbox ↗'}</button>
      </div>
      <div className="sb-tip" aria-live="polite">
        {error ? <span className="sb-error">{error}</span> : 'Sandbox login: admin / admin'}
      </div>
    </form>
  )
}

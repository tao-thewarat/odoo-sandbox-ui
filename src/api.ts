export type Me = { user: string; display_name: string; is_admin: boolean }

export type Stats = { environments: number }

export type Job = {
  id: string
  name: string | null
  odoo_version: string
  edition: 'enterprise' | 'community'
  status: string
  url: string | null
  error: string | null
  created_at: string
  owner: string | null
}

export type JobAction = 'stop' | 'start' | 'delete'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

// Shared so concurrent 401s rotate the refresh token only once
let refreshing: Promise<boolean> | null = null

function refreshTokens() {
  refreshing ??= fetch('/auth/refresh', { method: 'POST' })
    .then((response) => response.ok, () => false)
    .finally(() => { refreshing = null })
  return refreshing
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response = await fetch(path, init)
  if (response.status === 401 && await refreshTokens()) response = await fetch(path, init)
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new ApiError(response.status, typeof body?.detail === 'string' ? body.detail : response.statusText)
  }
  return response.status === 204 ? (undefined as T) : response.json()
}

export const getMe = () => request<Me>('/api/me')
export const getStats = () => request<Stats>('/api/stats')
export const getJobs = () => request<Job[]>('/api/jobs')
export const createJob = (form: FormData) => request<Job>('/api/jobs', { method: 'POST', body: form })
export const runJobAction = (id: string, action: JobAction) => request<Job>(`/api/jobs/${id}/${action}`, { method: 'POST' })
export const logout = () => request<void>('/auth/logout', { method: 'POST' })

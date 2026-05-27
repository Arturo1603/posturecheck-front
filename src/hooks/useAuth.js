import { useState } from 'react'
import { authApi } from '../services/api'
import { useAuthContext } from '../context/AuthContext'

export const useAuth = () => {
  const { login: setAuth, logout, user } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const register = async (data) => {
    setLoading(true); setError(null)
    try {
      const res = await authApi.register(data)
      setAuth(res.data.user, res.data.token)
      return true
    } catch (e) { setError(e.message); return false }
    finally { setLoading(false) }
  }

  const login = async (data) => {
    setLoading(true); setError(null)
    try {
      const res = await authApi.login(data)
      setAuth(res.data.user, res.data.token)
      return true
    } catch (e) { setError(e.message); return false }
    finally { setLoading(false) }
  }

  return { user, register, login, logout, loading, error }
}

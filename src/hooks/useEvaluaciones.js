import { useState, useEffect } from 'react'
import { evaluacionesApi } from '../services/api'

export const useEvaluaciones = () => {
  const [evaluaciones, setEvaluaciones] = useState([])
  const [pagination, setPagination]     = useState({ total: 0, page: 1, totalPages: 1 })
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)

  const fetchAll = async ({ search = '', page = 1, limit = 10 } = {}) => {
    setLoading(true)
    try {
      const params = `?search=${search}&page=${page}&limit=${limit}`
      const res = await evaluacionesApi.getAll(params)
      setEvaluaciones(res.data.data)
      setPagination({ total: res.data.total, page: res.data.page, totalPages: res.data.totalPages })
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchAll() }, [])

  const create = async (data) => {
    const res = await evaluacionesApi.create(data)
    return res.data
  }

  const update = async (id, data) => {
    const res = await evaluacionesApi.update(id, data)
    return res.data
  }

  const remove = async (id) => {
    await evaluacionesApi.delete(id)
  }

  return { evaluaciones, pagination, loading, error, fetchAll, create, update, remove }
}

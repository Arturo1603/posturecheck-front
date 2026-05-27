const BASE = import.meta.env.VITE_API_BASE_URL

const getToken = () => localStorage.getItem('token')

const headers = (auth = true) => ({
  'Content-Type': 'application/json',
  ...(auth && getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
})

const request = async (url, options = {}) => {
  const res = await fetch(`${BASE}${url}`, options)
  const data = await res.json()
  if (!data.ok) throw new Error(data.message || 'Error en la petición')
  return data
}

export const authApi = {
  register: (body) => request('/auth/register', {
    method: 'POST', headers: headers(false), body: JSON.stringify(body)
  }),
  login: (body) => request('/auth/login', {
    method: 'POST', headers: headers(false), body: JSON.stringify(body)
  }),
  me: () => request('/auth/me', { headers: headers() }),
}

export const evaluacionesApi = {
  getAll:    (params = '') => request(`/evaluaciones${params}`,    { headers: headers() }),
  getById:   (id)          => request(`/evaluaciones/${id}`,       { headers: headers() }),
  create:    (body)        => request('/evaluaciones',             { method: 'POST', headers: headers(), body: JSON.stringify(body) }),
  update:    (id, body)    => request(`/evaluaciones/${id}`,       { method: 'PUT',  headers: headers(), body: JSON.stringify(body) }),
  delete:    (id)          => request(`/evaluaciones/${id}`,       { method: 'DELETE', headers: headers() }),
  dashboard: ()            => request('/evaluaciones/dashboard',   { headers: headers() }),
  recomendaciones: (zona)  => request(`/evaluaciones/recomendaciones/${zona}`, { headers: headers() }),
}

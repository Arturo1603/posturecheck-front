import { useEffect, useState } from 'react'
import { evaluacionesApi } from '../services/api'
import { ZONE_LABELS } from '../constants/zones'
import Loader from '../components/Loader'

export default function DetailView({ evaluationId, navigate }) {
  const [ev, setEv]           = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    evaluacionesApi.getById(evaluationId)
      .then(res => setEv(res.data))
      .catch(() => navigate('history'))
      .finally(() => setLoading(false))
  }, [evaluationId])

  if (loading) return <Loader />
  if (!ev) return null

  const painColor = ev.intensidad <= 3 ? 'text-green-600 bg-green-50' : ev.intensidad <= 6 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'

  return (
    <div className="max-w-2xl fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('history')}
          className="text-sm text-gray-400 hover:text-gray-600 transition flex items-center gap-1">
          ← Volver
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-5">
        <div className="flex items-start justify-between mb-4">
          <h1 className="font-display text-xl font-bold text-gray-900">Detalle de evaluación</h1>
          <button onClick={() => navigate('edit', { evaluationId: ev.id, evaluation: ev })}
            className="text-sm text-purple border border-purple px-3 py-1.5 rounded-xl hover:bg-purple-light transition">
            Editar
          </button>
        </div>

        <p className="text-xs text-gray-400 mb-5">
          {new Date(ev.fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}
          {' · '}
          {new Date(ev.fecha).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Zona</p>
            <p className="text-sm font-semibold text-gray-900">{ZONE_LABELS[ev.zona] || ev.zona}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Intensidad del dolor</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${painColor}`}>
              {ev.intensidad}/10
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Causa probable</p>
            <p className="text-sm font-medium text-gray-700">{ev.causa || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Comentario</p>
            <p className="text-sm text-gray-600 leading-relaxed">{ev.comentario || 'Sin comentario'}</p>
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      {ev.recomendaciones?.length > 0 && (
        <div>
          <h2 className="font-display text-lg font-bold text-gray-900 mb-3">Recomendaciones</h2>
          <div className="flex flex-col gap-3">
            {ev.recomendaciones.map(r => (
              <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-purple-light rounded-xl flex items-center justify-center text-xl flex-shrink-0">🧘</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{r.titulo}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.descripcion}</p>
                  <span className="inline-block mt-1.5 text-xs bg-purple-light text-purple px-2.5 py-0.5 rounded-full font-medium">
                    {r.series} series · {r.repeticiones}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

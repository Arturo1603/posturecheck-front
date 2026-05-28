import { useEffect, useState } from 'react'
import { evaluacionesApi } from '../services/api'
import { ZONE_LABELS } from '../constants/zones'
import Loader from '../components/Loader'

export default function RecommendationsView({ zone, evaluation, navigate }) {
  const [recos, setRecos]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    evaluacionesApi.recomendaciones(zone)
      .then(res => setRecos(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [zone])

  return (
    <div className="max-w-xl fade-in">
      
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6">
        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
        <div>
          <p className="text-sm font-semibold text-green-800">¡Evaluación guardada con éxito!</p>
          <p className="text-xs text-green-600">Hemos preparado recomendaciones para ti.</p>
        </div>
      </div>

      <div className="mb-5">
        <h1 className="font-display text-xl font-bold text-gray-900">
          Recomendaciones para {ZONE_LABELS[zone]?.toLowerCase()}
        </h1>
        {evaluation && (
          <p className="text-sm text-gray-500 mt-1">
            Intensidad: <strong>{evaluation.intensidad}/10</strong>
            {evaluation.causa && <> · {evaluation.causa}</>}
          </p>
        )}
      </div>

      {loading ? <Loader /> : (
        <div className="flex flex-col gap-3">
          {recos.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:border-purple-mid transition shadow-sm">
              <div className="w-12 h-12 bg-purple-light rounded-xl flex items-center justify-center text-xl flex-shrink-0">🧘</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{r.titulo}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{r.descripcion}</p>
                <span className="inline-block mt-1.5 text-xs bg-purple-light text-purple px-2.5 py-0.5 rounded-full font-medium">
                  {r.series} series · {r.repeticiones}
                </span>
              </div>
              <span className="text-gray-300 text-lg flex-shrink-0">→</span>
            </div>
          ))}

          <button onClick={() => navigate('history')}
            className="w-full mt-2 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition text-center">
            Ver todos los ejercicios
          </button>
        </div>
      )}

      <button onClick={() => navigate('dashboard')}
        className="w-full mt-3 py-3 bg-purple text-white rounded-xl text-sm font-medium hover:bg-purple-dark transition">
        Ver mi historial
      </button>
    </div>
  )
}

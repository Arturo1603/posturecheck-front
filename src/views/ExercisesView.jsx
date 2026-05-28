import { useEffect, useState } from 'react'
import { evaluacionesApi } from '../services/api'
import { ZONES } from '../constants/zones'
import Loader from '../components/Loader'

export default function ExercisesView() {
  const [exercises, setExercises] = useState([])
  const [filter, setFilter]       = useState('all')
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const results = await Promise.all(
          ZONES.map(z => evaluacionesApi.recomendaciones(z.id).then(r => r.data).catch(() => []))
        )
        setExercises(results.flat())
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const filtered = filter === 'all' ? exercises : exercises.filter(e => e.zona === filter)

  return (
    <div className="max-w-3xl fade-in">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Ejercicios</h1>
        <p className="text-gray-500 text-sm mt-1">Biblioteca completa de ejercicios por zona</p>
      </div>


      <div className="flex gap-2 flex-wrap mb-5">
        <button onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
            ${filter === 'all' ? 'bg-purple text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          Todas
        </button>
        {ZONES.map(z => (
          <button key={z.id} onClick={() => setFilter(z.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
              ${filter === z.id ? 'bg-purple text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {z.label}
          </button>
        ))}
      </div>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-4 hover:border-purple-mid transition shadow-sm">
              <div className="w-12 h-12 bg-purple-light rounded-xl flex items-center justify-center text-xl flex-shrink-0">🧘</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-900">{r.titulo}</p>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 capitalize">
                    {r.zona.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{r.descripcion}</p>
                <span className="inline-block mt-2 text-xs bg-purple-light text-purple px-2.5 py-0.5 rounded-full font-medium">
                  {r.series} series · {r.repeticiones}
                </span>
              </div>
            </div>
          ))}
          {!filtered.length && (
            <div className="col-span-2 text-center py-10 text-gray-400 text-sm">
              No hay ejercicios para esta zona aún
            </div>
          )}
        </div>
      )}
    </div>
  )
}

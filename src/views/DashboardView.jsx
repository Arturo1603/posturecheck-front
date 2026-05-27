import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { evaluacionesApi } from '../services/api'
import Loader from '../components/Loader'
import { ZONE_LABELS } from '../constants/zones'

export default function DashboardView({ navigate }) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    evaluacionesApi.dashboard()
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  const { stats, chart, zonas } = data || { stats: {}, chart: [], zonas: [] }

  const statCards = [
    { label: 'Evaluaciones totales',          value: stats?.total || 0 },
    { label: 'Promedio de dolor (últimos 7 días)', value: stats?.promedio_dolor ? `${stats.promedio_dolor}/10` : '—' },
    { label: 'Zona más frecuente',            value: ZONE_LABELS[stats?.zona_frecuente] || stats?.zona_frecuente || '—' },
    { label: 'Mejoría vs. semana anterior',   value: '-18%', accent: 'text-green-500' },
  ]

  return (
    <div className="max-w-4xl fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Dashboard</h1>
        <button onClick={() => navigate('evaluation-zone')}
          className="px-4 py-2 bg-purple text-white rounded-xl text-sm font-medium hover:bg-purple-dark transition">
          + Nueva evaluación
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {statCards.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className={`font-display text-xl md:text-2xl font-bold ${s.accent || 'text-gray-900'}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1 leading-snug">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Evolución del dolor (últimos 7 días)</h3>
        {chart.length > 0 ? (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F5"/>
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#9E9EAF' }} axisLine={false} tickLine={false}/>
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#9E9EAF' }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E0E0EA', fontSize: 12 }}
                formatter={v => [`${v}/10`, 'Dolor']}/>
              <Line type="monotone" dataKey="dolor" stroke="#6C63FF" strokeWidth={2.5}
                dot={{ fill: '#6C63FF', r: 4 }} activeDot={{ r: 6 }}/>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-32 flex items-center justify-center text-gray-400 text-sm">
            No hay datos suficientes aún
          </div>
        )}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Zonas frecuentes */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Zonas frecuentes</h3>
          {zonas.length > 0 ? (
            <div className="flex flex-col gap-2">
              {zonas.map(z => (
                <div key={z.zona} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{ZONE_LABELS[z.zona] || z.zona}</span>
                  <span className="font-semibold text-gray-900">{z.total}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Sin datos aún</p>
          )}
        </div>

        {/* Última evaluación */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Última evaluación</h3>
          {stats?.ultima_fecha ? (
            <div className="text-sm text-gray-600">
              <p>{new Date(stats.ultima_fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              <p className="mt-1">Zona: <strong>{ZONE_LABELS[stats.zona_frecuente] || '—'}</strong></p>
              <p className="mt-1">Dolor: <strong>{stats.promedio_dolor}/10</strong></p>
              <button onClick={() => navigate('history')}
                className="mt-3 text-xs text-purple font-medium hover:underline">
                Ver detalle →
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Sin evaluaciones aún</p>
          )}
        </div>
      </div>
    </div>
  )
}

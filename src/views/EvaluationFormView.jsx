import { useState } from 'react'
import ItemForm from '../components/ItemForm'
import Toast from '../components/Toast'
import { useEvaluaciones } from '../hooks/useEvaluaciones'
import { ZONE_LABELS } from '../constants/zones'

export default function EvaluationFormView({ zone, navigate }) {
  const { create } = useEvaluaciones()
  const [loading, setLoading] = useState(false)
  const [toast, setToast]     = useState(null)

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      const ev = await create({ ...data, zona: zone })
      navigate('recommendations', { zone, evaluation: ev })
    } catch (e) {
      setToast({ message: e.message, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs text-gray-400 mb-1">Nueva evaluación</p>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            {ZONE_LABELS[zone] || zone}
          </h1>
        </div>
        <button onClick={() => navigate('evaluation-zone')}
          className="text-sm text-purple border border-purple px-4 py-2 rounded-xl hover:bg-purple-light transition">
          ← Cambiar zona
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <ItemForm
          initialData={{ zona: zone, intensidad: 5, causa: 'Mala postura al sentarme', comentario: '' }}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  )
}

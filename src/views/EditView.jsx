import { useState } from 'react'
import ItemForm from '../components/ItemForm'
import Toast from '../components/Toast'
import { useEvaluaciones } from '../hooks/useEvaluaciones'
import { ZONE_LABELS } from '../constants/zones'

export default function EditView({ evaluationId, evaluation, navigate }) {
  const { update }        = useEvaluaciones()
  const [loading, setLoading] = useState(false)
  const [toast, setToast]     = useState(null)

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await update(evaluationId, data)
      setToast({ message: 'Evaluación actualizada', type: 'success' })
      setTimeout(() => navigate('history'), 1200)
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
          <p className="text-xs text-gray-400 mb-1">Editar evaluación</p>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            {ZONE_LABELS[evaluation?.zona] || 'Evaluación'}
          </h1>
        </div>
        <button onClick={() => navigate('history')}
          className="text-sm text-gray-400 hover:text-gray-600 transition">
          ← Volver
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <ItemForm
          initialData={evaluation}
          onSubmit={handleSubmit}
          onCancel={() => navigate('history')}
          loading={loading}
        />
      </div>
    </div>
  )
}

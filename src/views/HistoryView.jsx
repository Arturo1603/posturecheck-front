import { useState } from 'react'
import ItemList from '../components/ItemList'
import Toast from '../components/Toast'
import { useEvaluaciones } from '../hooks/useEvaluaciones'

export default function HistoryView({ navigate }) {
  const { evaluaciones, pagination, loading, fetchAll, remove } = useEvaluaciones()
  const [search, setSearch]   = useState('')
  const [toast, setToast]     = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    fetchAll({ search, page: 1 })
  }

  const handleDelete = async (id) => {
    try {
      await remove(id)
      setToast({ message: 'Evaluación eliminada', type: 'success' })
      fetchAll({ search, page: pagination.page })
    } catch {
      setToast({ message: 'Error al eliminar', type: 'error' })
    }
  }

  const handlePage = (p) => fetchAll({ search, page: p })

  return (
    <div className="max-w-4xl fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Historial de evaluaciones</h1>
        <button onClick={() => navigate('evaluation-zone')}
          className="px-4 py-2 bg-purple text-white rounded-xl text-sm font-medium hover:bg-purple-dark transition">
          + Nueva evaluación
        </button>
      </div>

      {/* Search + filter bar */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Buscar evaluación..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-purple"
        />
        <button type="submit"
          className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition">
          🔍 Filtros
        </button>
      </form>

      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        <ItemList
          evaluaciones={evaluaciones}
          loading={loading}
          onView={(ev) => navigate('detail', { evaluationId: ev.id })}
          onEdit={(ev) => navigate('edit', { evaluationId: ev.id, evaluation: ev })}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-gray-100">
            <button
              onClick={() => handlePage(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition">
              ‹
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => handlePage(p)}
                className={`px-3 py-1.5 text-sm rounded-lg transition
                  ${p === pagination.page ? 'bg-purple text-white' : 'text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
                {p}
              </button>
            ))}
            <button
              onClick={() => handlePage(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition">
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

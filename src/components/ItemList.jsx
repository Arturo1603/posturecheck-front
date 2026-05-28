import { useState } from 'react'
import Modal from './Modal'
import { ZONE_LABELS } from '../constants/zones'

const painColor = (n) =>
  n <= 3 ? 'bg-green-100 text-green-700'
  : n <= 6 ? 'bg-yellow-100 text-yellow-700'
  : 'bg-red-100 text-red-700'

export default function ItemList({ evaluaciones, onView, onEdit, onDelete, loading }) {
  const [deleteId, setDeleteId] = useState(null)

  if (loading) return (
    <div className="text-center py-10 text-gray-400 text-sm">Cargando evaluaciones...</div>
  )

  if (!evaluaciones.length) return (
    <div className="text-center py-14 text-gray-400">
      <p className="text-4xl mb-3">📋</p>
      <p className="text-sm font-medium">No tienes evaluaciones aún</p>
      <p className="text-xs mt-1">Crea tu primera evaluación</p>
    </div>
  )

  return (
    <>
     
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Fecha', 'Zona', 'Dolor (1-10)', 'Causa probable', 'Acciones'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-gray-400 pb-3 pr-4 last:pr-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map(ev => (
              <tr key={ev.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition">
                <td className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                  {new Date(ev.fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="py-3 pr-4 text-gray-600">
                  {ZONE_LABELS[ev.zona] || ev.zona}
                </td>
                <td className="py-3 pr-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${painColor(ev.intensidad)}`}>
                    {ev.intensidad}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-500 max-w-[180px] truncate">{ev.causa}</td>
                <td className="py-3">
                  <div className="flex gap-1">
                    <button onClick={() => onView(ev)} title="Ver detalle"
                      className="p-1.5 rounded-lg hover:bg-purple-light text-gray-400 hover:text-purple transition text-base">👁</button>
                    <button onClick={() => onEdit(ev)} title="Editar"
                      className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition text-base">✏️</button>
                    <button onClick={() => setDeleteId(ev.id)} title="Eliminar"
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition text-base">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
      <div className="md:hidden flex flex-col gap-3">
        {evaluaciones.map(ev => (
          <div key={ev.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{ZONE_LABELS[ev.zona] || ev.zona}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(ev.fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${painColor(ev.intensidad)}`}>
                {ev.intensidad}/10
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3 truncate">{ev.causa}</p>
            <div className="flex gap-2 border-t border-gray-50 pt-2">
              <button onClick={() => onView(ev)} className="flex-1 py-1.5 text-xs text-purple bg-purple-light rounded-lg font-medium">Ver</button>
              <button onClick={() => onEdit(ev)} className="flex-1 py-1.5 text-xs text-blue-600 bg-blue-50 rounded-lg font-medium">Editar</button>
              <button onClick={() => setDeleteId(ev.id)} className="flex-1 py-1.5 text-xs text-red-500 bg-red-50 rounded-lg font-medium">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <Modal
          title="¿Eliminar esta evaluación?"
          message="Esta acción no se puede deshacer. ¿Estás seguro que deseas eliminar esta evaluación?"
          onConfirm={() => { onDelete(deleteId); setDeleteId(null) }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  )
}

import { useState, useEffect } from 'react'
import { ZONES, CAUSAS } from '../constants/zones'
import PainScale from './PainScale'
import BodyDiagram from './BodyDiagram'

export default function ItemForm({ initialData, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    zona: '', intensidad: 5, causa: CAUSAS[0], comentario: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => { if (initialData) setForm(initialData) }, [initialData])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const validate = () => {
    const e = {}
    if (!form.zona)       e.zona       = 'Selecciona una zona'
    if (!form.intensidad) e.intensidad = 'Selecciona la intensidad'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        
        <div className="flex flex-col items-center gap-4">
          <BodyDiagram selected={form.zona} onSelect={(z) => set('zona', z)} />
          {errors.zona && <p className="text-xs text-red-500">{errors.zona}</p>}
          <div className="w-full flex flex-col gap-1.5">
            {ZONES.map(z => (
              <button
                key={z.id}
                type="button"
                onClick={() => set('zona', z.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-sm transition-all text-left
                  ${form.zona === z.id
                    ? 'bg-purple-light border-purple text-purple font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-purple-mid bg-white'}`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-all
                  ${form.zona === z.id ? 'bg-purple border-purple' : 'border-gray-300'}`}/>
                {z.label}
              </button>
            ))}
          </div>
        </div>

     
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cuál es la intensidad de tu molestia?
            </label>
            <PainScale value={form.intensidad} onChange={(v) => set('intensidad', v)} />
            {errors.intensidad && <p className="text-xs text-red-500 mt-1">{errors.intensidad}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ¿Cuál crees que es la causa?
            </label>
            <select
              value={form.causa}
              onChange={e => set('causa', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-purple text-gray-700"
            >
              {CAUSAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Comentario (opcional)
            </label>
            <textarea
              value={form.comentario}
              onChange={e => set('comentario', e.target.value)}
              placeholder="Siento dolor al estar mucho tiempo sentado trabajando en la computadora."
              rows={4}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-purple resize-none text-gray-700"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-purple text-white rounded-xl text-sm font-medium hover:bg-purple-dark transition disabled:opacity-50"
            >
              {loading ? 'Guardando...' : initialData?.id ? 'Guardar cambios' : 'Guardar evaluación'}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

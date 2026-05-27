import { useState } from 'react'
import BodyDiagram from '../components/BodyDiagram'
import { ZONES } from '../constants/zones'

export default function EvaluationZoneView({ navigate }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="max-w-2xl fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Nueva evaluación</h1>
          <p className="text-gray-500 text-sm mt-1">Selecciona la zona donde sientes molestia</p>
        </div>
        <button onClick={() => navigate('history')}
          className="text-sm text-gray-400 hover:text-gray-600 transition">
          ← Volver
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Body diagram */}
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <BodyDiagram selected={selected} onSelect={setSelected} />
          </div>

          {/* Zone list */}
          <div className="flex-1 w-full">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Selecciona una zona</p>
            <div className="flex flex-col gap-2">
              {ZONES.map(z => (
                <button key={z.id} onClick={() => setSelected(z.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all text-left
                    ${selected === z.id
                      ? 'bg-purple-light border-purple text-purple font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-purple-mid bg-white'}`}>
                  <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-all
                    ${selected === z.id ? 'bg-purple border-purple' : 'border-gray-300'}`}/>
                  {z.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => selected && navigate('evaluation-form', { zone: selected })}
              disabled={!selected}
              className="w-full mt-5 py-3 bg-purple text-white rounded-xl text-sm font-medium hover:bg-purple-dark transition disabled:opacity-40 disabled:cursor-not-allowed">
              Continuar →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

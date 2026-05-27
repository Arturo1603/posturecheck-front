export default function WelcomeView({ navigate }) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center fade-in">
        <div className="text-4xl mb-3">👋</div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">¡Bienvenido a PostureCheck!</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Vamos a hacer un recorrido rápido de las funciones principales.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: '☰', title: 'Historial', desc: 'Consulta tus evaluaciones anteriores' },
            { icon: '♡', title: 'Recomendaciones', desc: 'Recibe ejercicios y consejos personalizados' },
            { icon: '↗', title: 'Progreso', desc: 'Visualiza tu evolución en el tiempo' },
          ].map(f => (
            <div key={f.title} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="w-9 h-9 bg-purple-light text-purple rounded-lg flex items-center justify-center text-lg mx-auto mb-2">{f.icon}</div>
              <p className="text-xs font-semibold text-gray-900 mb-1">{f.title}</p>
              <p className="text-xs text-gray-400 leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('evaluation-zone')}
          className="w-full py-3 bg-purple text-white rounded-xl text-sm font-medium hover:bg-purple-dark transition">
          Comenzar
        </button>
      </div>
    </div>
  )
}

export default function LandingView({ navigate }) {
  return (
    <div className="min-h-screen bg-white">
     
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center text-white font-display font-bold">P</div>
          <span className="font-display font-bold text-gray-900">PostureCheck</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('auth')}
            className="text-sm text-gray-600 hover:text-purple transition font-medium">
            Iniciar sesión
          </button>
          <button onClick={() => navigate('auth')}
            className="text-sm bg-purple text-white px-4 py-2 rounded-lg hover:bg-purple-dark transition font-medium">
            Comenzar ahora
          </button>
        </div>
      </nav>

      
      <section className="px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
        <div className="flex-1">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Conoce tu cuerpo,<br/>
            entiende tu <span className="text-purple">bienestar.</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
            Registra tus molestias, recibe recomendaciones personalizadas y mejora tu calidad de vida.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button onClick={() => navigate('auth')}
              className="px-6 py-3 bg-purple text-white rounded-xl font-medium hover:bg-purple-dark transition text-sm">
              Comenzar ahora
            </button>
            <button onClick={() => navigate('auth')}
              className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition text-sm">
              Iniciar sesión
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {[
              'Evalúa tus molestias',
              'Recibe recomendaciones',
              'Sigue tu progreso',
              'Mejora tu bienestar',
            ].map(f => (
              <div key={f} className="flex items-center gap-2">
                <span className="w-4 h-4 bg-purple rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                <span className="text-sm text-gray-600">{f}</span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="w-64 h-72 bg-purple-light rounded-2xl flex items-center justify-center">
              <svg viewBox="0 0 140 260" width="160" fill="none">
                <circle cx="70" cy="32" r="24" fill="#AFA9EC"/>
                <circle cx="70" cy="32" r="16" fill="#EEEcff"/>
                <circle cx="63" cy="29" r="2.5" fill="#6C63FF"/>
                <circle cx="77" cy="29" r="2.5" fill="#6C63FF"/>
                <path d="M63 37 Q70 42 77 37" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <rect x="48" y="58" width="44" height="70" rx="22" fill="#6C63FF"/>
                <rect x="24" y="64" width="24" height="52" rx="12" fill="#AFA9EC"/>
                <rect x="92" y="64" width="24" height="52" rx="12" fill="#AFA9EC"/>
                <rect x="52" y="128" width="16" height="72" rx="8" fill="#6C63FF"/>
                <rect x="72" y="128" width="16" height="72" rx="8" fill="#6C63FF"/>
              </svg>
            </div>
           
            <div className="absolute -top-3 -right-6 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100 text-xs font-medium text-gray-700">
              🎯 Evaluación personalizada
            </div>
            <div className="absolute -bottom-3 -left-6 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100 text-xs font-medium text-gray-700">
              📈 Seguimiento en tiempo real
            </div>
          </div>
        </div>
      </section>

     
      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🎯', title: 'Evaluaciones precisas', desc: 'Selecciona la zona, indica la intensidad y recibe análisis inmediato.' },
            { icon: '💪', title: 'Ejercicios personalizados', desc: 'Recomendaciones específicas según tu zona y nivel de dolor.' },
            { icon: '📊', title: 'Progreso visual', desc: 'Gráficas de evolución para ver cómo mejoras semana a semana.' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-display font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

     
      <section className="px-6 md:px-12 py-16 text-center">
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
          Empieza hoy, es gratis
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Sin tarjeta de crédito. Tu primera evaluación en menos de 2 minutos.</p>
        <button onClick={() => navigate('auth')}
          className="px-8 py-3.5 bg-purple text-white rounded-xl font-medium hover:bg-purple-dark transition text-sm shadow-lg shadow-purple/20">
          Crear cuenta gratis →
        </button>
      </section>
    </div>
  )
}

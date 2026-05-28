import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function AuthView({ navigate }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const { login, register, loading, error } = useAuth()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = mode === 'login'
      ? await login({ email: form.email, password: form.password })
      : await register(form)
    if (ok) navigate('welcome')
  }

  return (
    <div className="min-h-screen flex">
      
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-light via-purple-light to-purple/10 flex-col justify-between p-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-purple rounded-xl flex items-center justify-center text-white font-display font-bold text-lg">P</div>
          <span className="font-display font-bold text-gray-900 text-lg">PostureCheck</span>
        </div>
        <div>
          <h1 className="font-display text-4xl font-bold text-gray-900 leading-tight mb-4">
            Conoce tu cuerpo,<br/>entiende tu <span className="text-purple">bienestar.</span>
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-6 max-w-sm">
            Registra tus molestias, recibe recomendaciones personalizadas y mejora tu calidad de vida.
          </p>
          {['Evalúa tus molestias', 'Recibe recomendaciones', 'Sigue tu progreso', 'Mejora tu bienestar'].map(f => (
            <div key={f} className="flex items-center gap-2 mb-2.5">
              <span className="w-5 h-5 bg-purple rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
              <span className="text-sm text-gray-600">{f}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400">© 2026 PostureCheck</p>
      </div>

      
      <div className="flex-1 lg:max-w-md flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm">

        
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center text-white font-display font-bold">P</div>
            <span className="font-display font-bold text-gray-900">PostureCheck</span>
          </div>

          
          <div className="flex mb-6 border-b border-gray-200">
            {[['login','Iniciar sesión'], ['register','Crear cuenta']].map(([m, l]) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 pb-3 text-sm font-medium border-b-2 -mb-px transition
                  ${mode === m ? 'border-purple text-purple' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                {l}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Nombre completo</label>
                <input type="text" placeholder="Tu nombre" value={form.name}
                  onChange={e => set('name', e.target.value)} required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-purple"/>
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Correo electrónico</label>
              <input type="email" placeholder="correo@ejemplo.com" value={form.email}
                onChange={e => set('email', e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-purple"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Contraseña</label>
              <input type="password" placeholder="••••••••" value={form.password}
                onChange={e => set('password', e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-purple"/>
            </div>

            {mode === 'login' && (
              <button type="button" className="text-xs text-purple text-right hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            )}

            {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-purple text-white rounded-xl text-sm font-medium hover:bg-purple-dark transition disabled:opacity-50 mt-1">
              {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>

            <div className="relative flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-200"/>
              <span className="text-xs text-gray-400">o continúa con</span>
              <div className="flex-1 h-px bg-gray-200"/>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {['Google', 'Manzanita'].map(p => (
                <button key={p} type="button"
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition font-medium">
                  {p === 'Google' ? '🇬' : '🍎'} {p}
                </button>
              ))}
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-purple font-medium hover:underline">
              {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

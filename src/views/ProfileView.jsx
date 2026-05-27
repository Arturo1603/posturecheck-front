import { useAuthContext } from '../context/AuthContext'

export default function ProfileView() {
  const { user, logout } = useAuthContext()

  return (
    <div className="max-w-lg fade-in">
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Perfil</h1>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-purple-light text-purple flex items-center justify-center text-2xl font-bold font-display">
            {user?.name?.slice(0, 2).toUpperCase() || 'US'}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-lg">{user?.name}</h2>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { label: 'Nombre completo', value: user?.name },
            { label: 'Correo electrónico', value: user?.email },
            { label: 'Miembro desde', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }) : '—' },
          ].map(f => (
            <div key={f.label} className="flex flex-col gap-0.5 py-3 border-b border-gray-50 last:border-0">
              <span className="text-xs text-gray-400">{f.label}</span>
              <span className="text-sm font-medium text-gray-700">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={logout}
        className="w-full py-3 border border-red-200 text-red-500 rounded-xl text-sm font-medium hover:bg-red-50 transition">
        Cerrar sesión
      </button>
    </div>
  )
}

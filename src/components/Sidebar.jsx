import { useAuthContext } from '../context/AuthContext'

const navItems = [
  { id: 'landing',          label: 'Inicio',            icon: '⊞' },
  { id: 'evaluation-zone',  label: 'Nueva evaluación',  icon: '+', accent: true },
  { id: 'history',          label: 'Historial',         icon: '☰' },
  { id: 'dashboard',        label: 'Dashboard',         icon: '↗' },
  { id: 'recommendations',  label: 'Recomendaciones',   icon: '♡' },
  { id: 'exercises',        label: 'Ejercicios',        icon: '🏃' },
  { id: 'profile',          label: 'Perfil',            icon: '👤' },
  { id: 'settings',         label: 'Ajustes',           icon: '⚙' },
]

export default function Sidebar({ activeScreen, navigate }) {
  const { user, logout } = useAuthContext()

  return (
    <>
      {/* DESKTOP sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 w-56 h-screen bg-white border-r border-gray-100 flex-col py-5 px-3 z-20">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 mb-6">
          <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center text-white font-display font-bold text-base flex-shrink-0">P</div>
          <span className="font-display font-bold text-gray-900 text-base">PostureCheck</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto scrollbar-hide">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all text-left w-full
                ${activeScreen === item.id
                  ? 'bg-purple-light text-purple font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}
                ${item.accent && activeScreen !== item.id ? 'text-purple font-medium' : ''}`}
            >
              <span className="w-5 text-center text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-gray-100 pt-4 px-2 mt-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-purple-light text-purple flex items-center justify-center text-xs font-bold flex-shrink-0">
              {user?.name?.slice(0, 2).toUpperCase() || 'US'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full text-left text-xs text-gray-400 hover:text-red-500 transition px-1 py-1"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* MOBILE bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-20 flex justify-around items-center px-2 py-2 safe-area-inset-bottom">
        {navItems.slice(0, 5).map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all
              ${activeScreen === item.id ? 'text-purple' : 'text-gray-400'}`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            <span className="text-[10px] font-medium leading-none">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </>
  )
}

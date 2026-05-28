import { useState } from 'react'
import { useAuthContext } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Loader from './components/Loader'

import LandingView         from './views/LandingView'
import AuthView            from './views/AuthView'
import WelcomeView         from './views/WelcomeView'
import EvaluationZoneView  from './views/EvaluationZoneView'
import EvaluationFormView  from './views/EvaluationFormView'
import RecommendationsView from './views/RecommendationsView'
import DashboardView       from './views/DashboardView'
import HistoryView         from './views/HistoryView'
import DetailView          from './views/DetailView'
import EditView            from './views/EditView'
import ExercisesView       from './views/ExercisesView'
import ProfileView         from './views/ProfileView'

export default function App() {
  const { user, loading } = useAuthContext()

  const [screen, setScreen]             = useState('landing')
  const [selectedZone, setSelectedZone] = useState(null)
  const [lastEvaluation, setLastEval]   = useState(null)
  const [evaluationId, setEvalId]       = useState(null)
  const [editEval, setEditEval]         = useState(null)

  if (loading) return <Loader fullscreen />


  if (!user) {
    if (screen === 'auth') return <AuthView navigate={navigate} />
    return <LandingView navigate={navigate} />
  }

  function navigate(to, data = {}) {
    if (data.zone)         setSelectedZone(data.zone)
    if (data.evaluation)   setLastEval(data.evaluation)
    if (data.evaluationId) setEvalId(data.evaluationId)
    if (data.evaluation)   setEditEval(data.evaluation)
    setScreen(to)
  }

  const authenticated = [
    'welcome', 'evaluation-zone', 'evaluation-form',
    'recommendations', 'dashboard', 'history',
    'detail', 'edit', 'exercises', 'profile', 'settings'
  ]

  if (!authenticated.includes(screen)) navigate('dashboard')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeScreen={screen} navigate={navigate} />

      
      <main className="flex-1 md:ml-56 p-4 md:p-8 pb-20 md:pb-8 min-h-screen">
        {screen === 'welcome'          && <WelcomeView         navigate={navigate} />}
        {screen === 'evaluation-zone'  && <EvaluationZoneView  navigate={navigate} />}
        {screen === 'evaluation-form'  && <EvaluationFormView  zone={selectedZone} navigate={navigate} />}
        {screen === 'recommendations'  && <RecommendationsView zone={selectedZone} evaluation={lastEvaluation} navigate={navigate} />}
        {screen === 'dashboard'        && <DashboardView       navigate={navigate} />}
        {screen === 'history'          && <HistoryView         navigate={navigate} />}
        {screen === 'detail'           && <DetailView          evaluationId={evaluationId} navigate={navigate} />}
        {screen === 'edit'             && <EditView            evaluationId={evaluationId} evaluation={editEval} navigate={navigate} />}
        {screen === 'exercises'        && <ExercisesView />}
        {screen === 'profile'          && <ProfileView />}
        {screen === 'settings'         && (
          <div className="max-w-lg">
            <h1 className="font-display text-2xl font-bold text-gray-900 mb-4">Ajustes</h1>
            <p className="text-gray-400 text-sm">Próximamente...</p>
          </div>
        )}
      </main>
    </div>
  )
}

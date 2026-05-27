export default function Loader({ fullscreen = false }) {
  if (fullscreen) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-purple-light border-t-purple rounded-full animate-spin" />
        <p className="text-sm text-gray-400 font-medium">Cargando...</p>
      </div>
    </div>
  )
  return (
    <div className="flex justify-center py-10">
      <div className="w-8 h-8 border-4 border-purple-light border-t-purple rounded-full animate-spin" />
    </div>
  )
}

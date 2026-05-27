export default function PainScale({ value, onChange }) {
  return (
    <div>
      <div className="flex gap-1.5 flex-wrap">
        {[1,2,3,4,5,6,7,8,9,10].map(n => {
          const color = n <= 3
            ? 'bg-green-100 text-green-700 border-green-300'
            : n <= 6
            ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
            : 'bg-red-100 text-red-700 border-red-300'

          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-lg border text-sm font-semibold transition-all
                ${value === n
                  ? `${color} ring-2 ring-offset-1 ring-purple scale-110 shadow-sm`
                  : 'border-gray-200 text-gray-500 hover:border-purple-mid bg-white'}`}
            >
              {n}
            </button>
          )
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>Sin molestia</span>
        <span>Molestia intensa</span>
      </div>
    </div>
  )
}

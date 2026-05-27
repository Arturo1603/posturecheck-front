import { useState } from 'react'

// Clickable zone hit areas mapped to body positions
const ZONES = {
  cuello: {
    label: 'Cuello',
    hitArea: { type: 'ellipse', cx: 100, cy: 72, rx: 16, ry: 11 },
  },
  hombros: {
    label: 'Hombros',
    hitArea: [
      { type: 'ellipse', cx: 58,  cy: 108, rx: 20, ry: 12 },
      { type: 'ellipse', cx: 142, cy: 108, rx: 20, ry: 12 },
    ],
    dotCx: 100, dotCy: 108,
  },
  'espalda-alta': {
    label: 'Espalda alta',
    hitArea: { type: 'rect', x: 70, y: 112, width: 60, height: 38, rx: 8 },
    dotCx: 100, dotCy: 131,
  },
  'espalda-baja': {
    label: 'Espalda baja',
    hitArea: { type: 'rect', x: 73, y: 152, width: 54, height: 40, rx: 8 },
    dotCx: 100, dotCy: 172,
  },
  rodillas: {
    label: 'Rodillas',
    hitArea: [
      { type: 'ellipse', cx: 80,  cy: 305, rx: 16, ry: 13 },
      { type: 'ellipse', cx: 120, cy: 305, rx: 16, ry: 13 },
    ],
    dotCx: 100, dotCy: 305,
  },
  munecas: {
    label: 'Muñecas',
    hitArea: [
      { type: 'ellipse', cx: 32,  cy: 238, rx: 12, ry: 9 },
      { type: 'ellipse', cx: 168, cy: 238, rx: 12, ry: 9 },
    ],
    dotCx: 100, dotCy: 238,
  },
}

function HitShape({ shape, isActive, isHovered, onClick, onMouseEnter, onMouseLeave }) {
  const fill   = isActive  ? 'rgba(108,99,255,0.35)' : isHovered ? 'rgba(108,99,255,0.18)' : 'rgba(108,99,255,0.07)'
  const stroke = isActive  ? '#6C63FF' : isHovered ? '#AFA9EC' : 'rgba(108,99,255,0.2)'
  const props  = { fill, stroke, strokeWidth: 1.5, style: { cursor: 'pointer', transition: 'all 0.18s' }, onClick, onMouseEnter, onMouseLeave }

  if (shape.type === 'ellipse')
    return <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} {...props} />
  if (shape.type === 'rect')
    return <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx={shape.rx} {...props} />
  return null
}

export default function BodyDiagram({ selected, onSelect }) {
  const [hovered, setHovered] = useState(null)

  const handleClick  = (id) => onSelect(id === selected ? null : id)
  const handleEnter  = (id) => setHovered(id)
  const handleLeave  = ()   => setHovered(null)

  // Get pulse dot position
  const getPulseDot = (id) => {
    const z = ZONES[id]
    if (!z) return null
    if (z.dotCx) return { cx: z.dotCx, cy: z.dotCy }
    const h = Array.isArray(z.hitArea) ? z.hitArea[0] : z.hitArea
    return { cx: h.cx ?? h.x + h.width / 2, cy: h.cy ?? h.y + h.height / 2 }
  }

  return (
    <div className="flex flex-col items-center select-none">
      <svg viewBox="0 0 200 420" className="w-32 md:w-40" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* ── BODY ANATOMY ── */}

        {/* Head */}
        <ellipse cx="100" cy="38" rx="27" ry="32" fill="#E0DEFA" stroke="#C8C3F6" strokeWidth="1.2"/>
        <ellipse cx="100" cy="38" rx="19" ry="22" fill="#EDE9FF"/>
        {/* Hair */}
        <ellipse cx="100" cy="14" rx="22" ry="10" fill="#C8C3F6"/>
        <ellipse cx="80"  cy="20" rx="10" ry="14" fill="#C8C3F6"/>
        <ellipse cx="120" cy="20" rx="10" ry="14" fill="#C8C3F6"/>
        {/* Face features */}
        <circle cx="91"  cy="35" r="2.5" fill="#9E99D4"/>
        <circle cx="109" cy="35" r="2.5" fill="#9E99D4"/>
        <path d="M91 44 Q100 49 109 44" stroke="#9E99D4" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Ears */}
        <ellipse cx="72"  cy="38" rx="5" ry="7" fill="#D8D4F8" stroke="#C8C3F6" strokeWidth="1"/>
        <ellipse cx="128" cy="38" rx="5" ry="7" fill="#D8D4F8" stroke="#C8C3F6" strokeWidth="1"/>

        {/* Neck */}
        <rect x="88" y="67" width="24" height="18" rx="5" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1"/>

        {/* Shoulders / Trapezius */}
        <path d="M60 96 Q48 92 40 100 L36 120 Q36 126 44 127 L60 127 Q66 125 68 118 L72 100 Q68 94 60 96Z" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1.2"/>
        <path d="M140 96 Q152 92 160 100 L164 120 Q164 126 156 127 L140 127 Q134 125 132 118 L128 100 Q132 94 140 96Z" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1.2"/>

        {/* Torso */}
        <path d="M68 93 Q60 90 60 96 L60 192 Q60 198 68 200 L132 200 Q140 198 140 192 L140 96 Q140 90 132 93 Q116 87 100 87 Q84 87 68 93Z" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1.2"/>
        {/* Chest details */}
        <path d="M80 100 Q100 96 120 100" stroke="#C8C3F6" strokeWidth="1" strokeLinecap="round"/>
        <line x1="100" y1="102" x2="100" y2="195" stroke="#C8C3F6" strokeWidth="0.7" strokeDasharray="3,3"/>
        {/* Abs lines */}
        <path d="M82 135 Q100 132 118 135" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M82 155 Q100 152 118 155" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M82 175 Q100 172 118 175" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>

        {/* Left Upper Arm */}
        <path d="M60 100 Q46 104 40 120 L34 170 Q33 178 40 179 L52 180 Q58 179 59 171 L64 122 Q66 108 68 100Z" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1.2"/>
        {/* Left Forearm */}
        <path d="M40 179 L34 228 Q33 236 40 237 L52 238 Q58 237 59 229 L52 180Z" fill="#E8E5FF" stroke="#C8C3F6" strokeWidth="1"/>
        {/* Left Hand */}
        <ellipse cx="43" cy="247" rx="11" ry="13" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1"/>
        <path d="M36 240 Q34 255 36 260" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M40 238 Q37 255 39 262" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M44 237 Q42 256 44 263" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M48 238 Q47 256 49 262" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>

        {/* Right Upper Arm */}
        <path d="M140 100 Q154 104 160 120 L166 170 Q167 178 160 179 L148 180 Q142 179 141 171 L136 122 Q134 108 132 100Z" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1.2"/>
        {/* Right Forearm */}
        <path d="M160 179 L166 228 Q167 236 160 237 L148 238 Q142 237 141 229 L148 180Z" fill="#E8E5FF" stroke="#C8C3F6" strokeWidth="1"/>
        {/* Right Hand */}
        <ellipse cx="157" cy="247" rx="11" ry="13" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1"/>
        <path d="M164 240 Q166 255 164 260" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M160 238 Q163 255 161 262" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M156 237 Q158 256 156 263" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M152 238 Q153 256 151 262" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>

        {/* Pelvis */}
        <path d="M60 196 Q52 204 52 218 Q52 234 68 236 L132 236 Q148 234 148 218 Q148 204 140 196Z" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1.2"/>

        {/* Left Thigh */}
        <path d="M68 232 Q56 238 52 254 L46 296 Q45 304 54 306 L72 306 Q79 305 80 297 L84 256 Q85 240 76 234Z" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1.2"/>
        {/* Left Knee cap */}
        <ellipse cx="65" cy="308" rx="14" ry="10" fill="#E0DEFA" stroke="#C8C3F6" strokeWidth="1"/>
        {/* Left Shin */}
        <path d="M54 318 L50 368 Q49 376 56 377 L74 377 Q80 376 80 368 L74 318Z" fill="#E8E5FF" stroke="#C8C3F6" strokeWidth="1.1"/>
        {/* Left Foot */}
        <ellipse cx="63" cy="384" rx="16" ry="9" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1"/>
        <path d="M55 384 Q50 388 48 393" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>

        {/* Right Thigh */}
        <path d="M132 232 Q144 238 148 254 L154 296 Q155 304 146 306 L128 306 Q121 305 120 297 L116 256 Q115 240 124 234Z" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1.2"/>
        {/* Right Knee cap */}
        <ellipse cx="135" cy="308" rx="14" ry="10" fill="#E0DEFA" stroke="#C8C3F6" strokeWidth="1"/>
        {/* Right Shin */}
        <path d="M146 318 L150 368 Q151 376 144 377 L126 377 Q120 376 120 368 L126 318Z" fill="#E8E5FF" stroke="#C8C3F6" strokeWidth="1.1"/>
        {/* Right Foot */}
        <ellipse cx="137" cy="384" rx="16" ry="9" fill="#DDD9FF" stroke="#C8C3F6" strokeWidth="1"/>
        <path d="M145 384 Q150 388 152 393" stroke="#C8C3F6" strokeWidth="0.8" strokeLinecap="round"/>

        {/* ── CLICKABLE HIT AREAS ── */}
        {Object.entries(ZONES).map(([id, zone]) => {
          const isActive  = selected === id
          const isHovered = hovered  === id
          const shapes    = Array.isArray(zone.hitArea) ? zone.hitArea : [zone.hitArea]

          return shapes.map((shape, i) => (
            <HitShape
              key={`${id}-${i}`}
              shape={shape}
              isActive={isActive}
              isHovered={isHovered}
              onClick={() => handleClick(id)}
              onMouseEnter={() => handleEnter(id)}
              onMouseLeave={handleLeave}
            />
          ))
        })}

        {/* ── PULSE DOT on selected ── */}
        {selected && ZONES[selected] && (() => {
          const dot = getPulseDot(selected)
          if (!dot) return null
          return (
            <g key={selected}>
              <circle cx={dot.cx} cy={dot.cy} r="8" fill="#6C63FF" opacity="0.15">
                <animate attributeName="r"       values="8;20;8"     dur="1.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.25;0;0.25" dur="1.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx={dot.cx} cy={dot.cy} r="5.5" fill="#6C63FF" opacity="0.9"/>
              <circle cx={dot.cx} cy={dot.cy} r="2.5" fill="white"/>
            </g>
          )
        })()}
      </svg>

      {/* Zone label */}
      {selected && ZONES[selected] && (
        <p className="text-xs font-semibold text-purple mt-1 fade-in">
          {ZONES[selected].label} seleccionado
        </p>
      )}
    </div>
  )
}

import { tipoConfig } from '../types'

export default function CardResumo({ tipo, total, ocupadas }) {
  const livres = total - ocupadas
  const config = tipoConfig[tipo]
  const pct    = total > 0 ? Math.round((ocupadas / total) * 100) : 0
  const corBarra = pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-green-500'

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{config.icone}</span>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">{config.label}</p>
            <p className="text-xs text-slate-500">Campus urbano</p>
          </div>
        </div>
        <span className="text-sm font-semibold text-slate-100">{pct}%</span>
      </div>
      <div className="flex justify-between text-sm text-slate-400">
        <span>{ocupadas} ocupadas</span>
        <span>{livres} livres</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full transition-all ${corBarra}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-slate-500 text-right">{pct}% ocupado</p>
    </div>
  )
}
import { tipoConfig, StatusVaga } from '../types'

export default function     Vagas({ vagas }) {
  const tipos = [...new Set(vagas.map(v => v.tipo))]

  return (
    <div className="flex flex-col gap-6">
      {tipos.map(tipo => {
        const vagasTipo = vagas.filter(v => v.tipo === tipo)
        const config    = tipoConfig[tipo]

        return (
          <div key={tipo} className="bg-slate-950/80 border border-slate-800 rounded-3xl p-4 shadow-lg shadow-slate-950/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">{config.label}</p>
                <p className="text-sm text-slate-300">{vagasTipo.length} vagas</p>
              </div>
              <span className="text-2xl">{config.icone}</span>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {vagasTipo.map(vaga => (
                <div
                  key={vaga.id}
                  title={vaga.status === StatusVaga.OCUPADA ? 'Ocupada' : 'Livre'}
                  className={`w-14 h-14 rounded-3xl flex items-center justify-center text-xs font-bold border-2 transition-all ring-1
                    ${vaga.status === StatusVaga.OCUPADA
                      ? 'bg-rose-500/10 border-rose-400/60 text-rose-100 ring-rose-400/20'
                      : 'bg-cyan-500/10 border-cyan-400/60 text-cyan-100 ring-cyan-400/20'}`}
                >
                  {vaga.numero}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
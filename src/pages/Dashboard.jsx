import { TipoVeiculo, StatusVaga } from '../types'
import CardResumo from '../components/CardResumo'
import MapaVagas from '../components/MapaVagas'

export default function Dashboard({ vagas, tickets }) {
  const tipos = Object.values(TipoVeiculo)

  return (
    <main className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Centro urbano</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-50">Dashboard do Estacionamento</h2>
        </div>
        <p className="text-cyan-200/80 text-sm">{tickets.length} veículo{tickets.length !== 1 ? 's' : ''} no pátio agora</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {tipos.map(tipo => {
          const vagasTipo = vagas.filter(v => v.tipo === tipo)
          const ocupadas  = vagasTipo.filter(v => v.status === StatusVaga.OCUPADA).length
          return (
            <CardResumo key={tipo} tipo={tipo} total={vagasTipo.length} ocupadas={ocupadas} />
          )
        })}
      </div>

      <div className="bg-slate-900/90 border border-slate-800 shadow-2xl rounded-3xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-slate-100">Mapa de vagas</h3>
          <span className="text-sm text-cyan-300/80">Visão estilo campus</span>
        </div>
        <MapaVagas vagas={vagas} />
      </div>
    </main>
  )
}
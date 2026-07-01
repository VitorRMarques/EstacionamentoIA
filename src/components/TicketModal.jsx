import { tipoConfig } from '../types'

export default function TicketModal({ ticket, vaga, onClose }) {
  const config = tipoConfig[ticket.tipo ]
  const hora   = new Date(ticket.horaEntrada).toLocaleTimeString('pt-BR')
  const data   = new Date(ticket.horaEntrada).toLocaleDateString('pt-BR')

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 border border-slate-800 shadow-2xl rounded-[28px] w-full max-w-sm overflow-hidden">

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/80 mb-2">EstacionamentoIA</p>
          <h2 className="text-2xl font-bold">Ticket de Entrada</h2>
          <p className="text-cyan-100/80 text-xs mt-1">{data} às {hora}</p>
        </div>

        <div className="p-6 flex flex-col gap-4 text-slate-100">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <span className="text-sm text-slate-400">Placa</span>
            <span className="font-bold text-lg tracking-widest">{ticket.placa}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <span className="text-sm text-slate-400">Tipo</span>
            <span className="font-semibold text-cyan-300">{config.icone} {config.label}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <span className="text-sm text-slate-400">Vaga</span>
            <span className="font-bold text-2xl text-white">{vaga.numero}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">ID do ticket</span>
            <span className="text-xs text-slate-500 font-mono">{ticket.id.slice(0, 8).toUpperCase()}</span>
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-3 rounded-2xl transition-colors"
          >
            🖨️ Imprimir
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium py-3 rounded-2xl transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  )
}
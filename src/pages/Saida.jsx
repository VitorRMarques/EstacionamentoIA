import { useState, useEffect } from 'react'
import { tipoConfig } from '../types'

function Timer({ horaEntrada }) {
  const [decorrido, setDecorrido] = useState('')

  useEffect(() => {
    function atualizar() {
      const diff = Math.floor((Date.now() - new Date(horaEntrada)) / 1000)
      const h = Math.floor(diff / 3600)
      const m = Math.floor((diff % 3600) / 60)
      const s = diff % 60
      setDecorrido(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`)
    }
    atualizar()
    const id = setInterval(atualizar, 1000)
    return () => clearInterval(id)
  }, [horaEntrada])

  return <span className="text-2xl font-mono font-bold text-blue-600">{decorrido}</span>
}

function CartaoTicket({ ticket, valor, onConfirmar }) {
  const config = tipoConfig[ticket.tipo]
  const [formaPag, setFormaPag] = useState('DINHEIRO')
  const formas = [
    { id: 'DINHEIRO', label: '💵 Dinheiro' },
    { id: 'CARTAO',   label: '💳 Cartão'   },
    { id: 'PIX',      label: '⚡ Pix'      },
  ]

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-[32px] shadow-2xl p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-2xl font-bold tracking-widest font-mono">{ticket.placa}</p>
          <p className="text-slate-400 text-sm">{config.icone} {config.label} · Vaga {ticket.vagaId}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Tempo estacionado</p>
          <Timer horaEntrada={ticket.horaEntrada} />
        </div>
      </div>

      <div className="bg-slate-950 rounded-3xl p-4 flex justify-between text-sm border border-slate-800">
        <span className="text-slate-500">Entrada</span>
        <span className="font-medium text-slate-100">{new Date(ticket.horaEntrada).toLocaleTimeString('pt-BR')}</span>
      </div>

      <div className="bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-4 flex justify-between items-center">
        <span className="text-cyan-200 font-semibold">Valor a cobrar</span>
        <span className="text-3xl font-bold text-cyan-100">
          {valor === 0 ? 'Grátis' : `R$ ${valor.toFixed(2)}`}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-200">Forma de pagamento</p>
        <div className="flex gap-2">
          {formas.map(f => (
            <button
              key={f.id}
              onClick={() => setFormaPag(f.id)}
              className={`flex-1 py-3 rounded-3xl text-sm font-medium border-2 transition-all duration-200
                ${formaPag === f.id
                  ? 'border-cyan-400 bg-cyan-500/10 text-cyan-200'
                  : 'border-slate-800 text-slate-300 hover:border-cyan-400 hover:bg-cyan-500/10'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onConfirmar(ticket.id, formaPag)}
        className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold py-4 rounded-full text-lg transition-all shadow-xl shadow-cyan-400/20"
      >
        ✅ Confirmar saída
      </button>
    </div>
  )
}

export default function Saida({ tickets, calcularValor, registrarSaida, onToast }) {
  const [busca, setBusca]         = useState('')
  const [concluidos, setConcluidos] = useState([])

  const buscaFormatada    = busca.toUpperCase().replace(/[^A-Z0-9]/g, '')
  const ticketsFiltrados  = buscaFormatada.length >= 3
    ? tickets.filter(t => t.placa.includes(buscaFormatada))
    : tickets

  async function handleConfirmar(ticketId, formaPag) {
    const res = await registrarSaida(ticketId)
    if (!res || res.erro) {
      onToast({ mensagem: res?.erro ?? 'Erro ao processar saída', tipo: 'erro' })
      return
    }

    setConcluidos(prev => [...prev, { ...res, formaPag }])
    onToast({
      mensagem: `Saída de ${res.ticket.placa} confirmada! ${res.valor === 0 ? 'Grátis' : `R$ ${res.valor.toFixed(2)}`}`,
      tipo: 'sucesso',
    })
  }

  return (
    <main className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Saída campus</p>
        <h2 className="text-3xl font-bold text-slate-50">Registrar Saída</h2>
        <p className="text-slate-400 text-sm">{tickets.length} veículo{tickets.length !== 1 ? 's' : ''} no pátio agora</p>
      </div>

      <div className="bg-slate-900/85 border border-slate-800 rounded-3xl shadow-2xl p-4">
        <input
          type="text"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar por placa..."
          maxLength={7}
          className="w-full border-2 border-slate-800 rounded-3xl px-4 py-3 font-mono uppercase tracking-widest text-center outline-none bg-slate-950 text-slate-100 focus:border-cyan-400 transition-colors"
        />
      </div>

      {ticketsFiltrados.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🅿</p>
          <p className="font-medium">Nenhum veículo encontrado</p>
          <p className="text-sm">Registre uma entrada primeiro</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {ticketsFiltrados.map(ticket => (
            <CartaoTicket
              key={ticket.id}
              ticket={ticket}
              valor={calcularValor(ticket)}
              onConfirmar={handleConfirmar}
            />
          ))}
        </div>
      )}

      {concluidos.length > 0 && (
        <div className="bg-slate-900/85 border border-slate-800 rounded-3xl shadow-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-100">✅ Saídas desta sessão</h3>
            <span className="text-sm text-cyan-300/80">Histórico rápido</span>
          </div>
          <div className="flex flex-col gap-2">
            {concluidos.map((c, i) => (
              <div key={i} className="flex justify-between items-center text-sm py-2 border-b last:border-0">
                <span className="font-mono font-bold">{c.ticket.placa}</span>
                <span className="text-gray-500">{c.formaPag}</span>
                <span className="font-semibold text-green-700">
                  {c.valor === 0 ? 'Grátis' : `R$ ${c.valor.toFixed(2)}`}
                </span>
              </div>
            ))}
          </div>
          <p className="text-right text-sm font-bold text-cyan-300 mt-3">
            Total: R$ {concluidos.reduce((acc, c) => acc + c.valor, 0).toFixed(2)}
          </p>
        </div>
      )}
    </main>
  )
}
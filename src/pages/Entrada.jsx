import { useState } from 'react'
import { TipoVeiculo, tipoConfig } from '../types'
import TicketModal from '../components/TicketModal'

const REGEX_PLACA = /^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/

export default function Entrada({ vagasLivresPorTipo, registrarEntrada, onToast }) {
  const [placa,     setPlaca]     = useState('')
  const [tipo,      setTipo]      = useState('')
  const [resultado, setResultado] = useState(null)
  const [loading,   setLoading]   = useState(false)

  const placaFormatada = placa.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7)
  const placaValida    = REGEX_PLACA.test(placaFormatada)
  const podeSalvar     = placaValida && tipo !== ''

  async function handleSubmit() {
    if (!podeSalvar) return
    setLoading(true)
    const res = await registrarEntrada({ placa: placaFormatada, tipo })
    setLoading(false)

    if (res.erro) {
      onToast({ mensagem: res.erro, tipo: 'erro' })
      return
    }

    setResultado(res)
    setPlaca('')
    setTipo('')
    onToast({ mensagem: `Veículo ${placaFormatada} registrado na vaga ${res.vaga.numero}!`, tipo: 'sucesso' })
  }

  return (
    <main className="p-6 max-w-2xl mx-auto flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Entrada rápida</p>
        <h2 className="text-3xl font-bold text-slate-50">Registrar Entrada</h2>
        <p className="text-slate-400 text-sm">Preencha os dados do veículo para liberar uma vaga no campus.</p>
      </div>

      <div className="bg-slate-900/85 border border-slate-800 rounded-3xl shadow-2xl p-5 flex flex-col gap-4">
        <label className="text-sm font-semibold text-gray-600">Placa do veículo</label>
        <input
          type="text"
          value={placaFormatada}
          onChange={e => setPlaca(e.target.value)}
          placeholder="ABC1234 ou ABC1D23"
          maxLength={7}
          className={`border-2 rounded-3xl px-4 py-3 text-lg font-mono tracking-widest uppercase text-center outline-none transition-colors bg-slate-950/90
            ${placaFormatada.length === 0 ? 'border-slate-800/80'
              : placaValida ? 'border-emerald-400/70 bg-emerald-500/10'
              : 'border-rose-400/70 bg-rose-500/10'}`}
        />
        {placaFormatada.length > 0 && !placaValida && (
          <p className="text-xs text-red-500">Formato inválido. Use ABC1234 (antiga) ou ABC1D23 (Mercosul)</p>
        )}
        {placaValida && <p className="text-xs text-green-600">✓ Placa válida</p>}
      </div>

      <div className="bg-slate-900/85 border border-slate-800 rounded-3xl shadow-2xl p-5 flex flex-col gap-4">
        <label className="text-sm font-semibold text-slate-200">Tipo de veículo</label>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(TipoVeiculo).map(t => {
            const config    = tipoConfig[t]
            const livres    = vagasLivresPorTipo(t).length
            const semVaga   = livres === 0
            const selecionado = tipo === t
            return (
              <button
                key={t}
                onClick={() => !semVaga && setTipo(t)}
                disabled={semVaga}
                className={`rounded-3xl border-2 p-4 flex flex-col items-center gap-2 text-sm transition-all duration-200
                  ${semVaga ? 'opacity-50 cursor-not-allowed border-slate-800 bg-slate-950/70 text-slate-500'
                    : selecionado ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/10 text-cyan-100'
                    : 'border-slate-800 bg-slate-950/80 hover:border-cyan-400 hover:bg-cyan-500/10 cursor-pointer text-slate-300'}`}
              >
                <span className="text-2xl">{config.icone}</span>
                <span className="text-sm font-semibold text-gray-700">{config.label}</span>
                <span className={`text-xs font-medium ${semVaga ? 'text-red-500' : 'text-green-600'}`}>
                  {semVaga ? 'Lotado' : `${livres} livre${livres > 1 ? 's' : ''}`}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!podeSalvar || loading}
        className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-lg
          ${podeSalvar && !loading
            ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-cyan-400/30'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
      >
        {loading ? 'Registrando...' : '🚘 Registrar entrada'}
      </button>

      {resultado && (
        <TicketModal ticket={resultado.ticket} vaga={resultado.vaga} onClose={() => setResultado(null)} />
      )}
    </main>
  )
}
import { useState, useCallback } from 'react'
import { useGaragem } from './store/useGaragem'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Entrada from './pages/Entrada'
import Saida from './pages/Saida'
import Toast from './components/Toast'

export default function App() {
  const [pagina, setPagina] = useState('dashboard')
  const [toast,  setToast]  = useState(null)
  const garagem = useGaragem()

  const onToast = useCallback((t) => setToast(t), [])

  if (garagem.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6">
        <div className="rounded-[32px] border border-cyan-400/20 bg-slate-900/90 px-10 py-12 text-center shadow-2xl shadow-cyan-500/10">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">Conectando ao backend</p>
          <h2 className="text-3xl font-bold text-slate-100">Carregando dados do estacionamento...</h2>
          <p className="mt-3 text-slate-400">Aguarde enquanto a persistência é inicializada.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_right,_rgba(168,85,247,0.12),transparent_25%),linear-gradient(180deg,#020617_0%,#0b1629_100%)]">
      <Header paginaAtual={pagina} setPagina={setPagina} />

      {pagina === 'dashboard' && (
        <Dashboard vagas={garagem.vagas} tickets={garagem.tickets} />
      )}
      {pagina === 'entrada' && (
        <Entrada
          vagasLivresPorTipo={garagem.vagasLivresPorTipo}
          registrarEntrada={garagem.registrarEntrada}
          onToast={onToast}
        />
      )}
      {pagina === 'saida' && (
        <Saida
          tickets={garagem.tickets}
          calcularValor={garagem.calcularValor}
          registrarSaida={garagem.registrarSaida}
          onToast={onToast}
        />
      )}

      {toast && (
        <Toast mensagem={toast.mensagem} tipo={toast.tipo} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
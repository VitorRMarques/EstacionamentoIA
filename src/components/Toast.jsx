import { useEffect } from 'react'

export default function Toast({ mensagem, tipo = 'sucesso', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])

  const estilos = {
    sucesso: 'bg-cyan-400 text-slate-950 shadow-cyan-400/30',
    erro:    'bg-rose-500 text-white shadow-rose-500/30',
    aviso:   'bg-amber-400 text-slate-950 shadow-amber-400/30',
  }

  return (
    <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-3xl shadow-2xl text-sm font-medium flex items-center gap-3 ${estilos[tipo]}`}>
      <span>{tipo === 'sucesso' ? '✅' : tipo === 'erro' ? '❌' : '⚠️'}</span>
      <span>{mensagem}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  )
}
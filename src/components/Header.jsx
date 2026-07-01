export default function Header({ paginaAtual, setPagina }) {
  const links = [
    { id: 'dashboard', label: '🅿 Dashboard' },
    { id: 'entrada',   label: '🚘 Entrada'   },
    { id: 'saida',     label: '🏁 Saída'     },
  ]

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 text-white px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between shadow-2xl shadow-slate-950/20">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Universidade</p>
        <h1 className="text-2xl font-bold tracking-[0.12em]">EstacionamentoIA</h1>
      </div>
      <nav className="flex flex-wrap gap-2">
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => setPagina(link.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200
              ${paginaAtual === link.id
                ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20'
                : 'text-slate-300 hover:bg-slate-800/90 hover:text-white'}`}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
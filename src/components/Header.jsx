export default function Header({ paginaAtual, setPagina }) {
    const links = [
        {id: 'dashboard', label: '🅿 Dashboard'},
        {id: 'entrada', label: '🚘 Entrada'},
        {id: 'saida', label: '🏁 Saída'}
    ]

    return (
        <header>
            <h1>EstacionamentoIA</h1>
            <nav>
                {links.map(link => {
                    <button
                      key={link.id}
                      onClick={() => setPagina(link.id)}
                      className={} > {link.label}</button>
                })}
            </nav>
        </header>
    )
}
import { tipoConfig } from "../types";

export default function CardResumo({tipo, total, ocupadas }) {
    const livres = total - ocupadas
    const config = tipoConfig[tipo]
    const pct = total > 0 ? Math.round((ocupadas / total) * 100) : 0

    const corBarra = pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-yellow-500': 'bg-green-500'

    return (
            <div>
                <div>
                    <span>{config.icone}</span>
                    <span>{config.label}</span>
                </div>
                <div>
                    <span>{ocupadas} ocupadas</span>
                    <span>{livres} livres</span>
                </div>
                <div>
                    <div/>
                </div>
                <p>{pct}% ocupado</p>
            </div>
    )
}
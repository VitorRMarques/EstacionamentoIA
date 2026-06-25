import { tipoConfig, StatusVaga } from "../types";

export default function MapaVagas({ vagas }) {
    const tipos = [... new Set(vagas.map(v => v.tipo))]

    return (
        <div>
            {tipos.map(tipo => {
                const vagasTipo = vagas.filter(v => v.tipo === tipo)
                const config = tipoConfig[tipo]

                return (
                    <div key={tipo}>
                        <h3>
                            {config.icone} {config.label}
                        </h3>

                    </div>
                )
            })}
        </div>
    )
}
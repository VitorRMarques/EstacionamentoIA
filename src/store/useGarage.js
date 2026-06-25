import { useState } from 'react'
import { vagasIniciais, tarifasIniciais } from '../data/mockData'
import { StatusVaga } from '../types'

export function useGaragem() {
    const [vagas, setVagas] = useState(vagasIniciais)
    const [tickets, setTickets] = useState([])
    const [tarifas] = useState(tarifasIniciais)

    function vagasPorTipo(tipo) {
        return vagas.filter(v => v.tipo === tipo)
    }

    function vagasLivresPorTipo(tipo) {
        return vagas.filter(v => v.tipo === tipo && v.status === StatusVaga.LIVRE)
    }

    function registrarEntrada({ placa, tipo}) {
        const vagaLivre = vagas.find(v => v.tipo === tipo && v.status === StatusVaga.LIVRE)
        if (!vagaLivre) return {erro: "Nenhuma vaga disponivel para esse tipo de veiculo."}

        const ticket = {
            id: crypto.randomUUID(),
            placa: placa.toUpperCase(),
            tipo,
            vagaId : vagaLivre.id,
            horaEntrada: new Date(),
        }

        setVagas(prev => prev.map(v => 
            v.id === vagaLivre.id ? { ...v, status: StatusVaga.OCUPADA}: v
        ))

        setTickets(prev => [ ...prev, ticket])

        return {ticket, vaga: vagaLivre}
    }

    function calcularVaga(ticket) {
        const tarifa = tarifas.find(t => t.ticket === ticket.tipo)
        const agora = new Date()
        const diffMs = agora - new Date(ticket.horaEntrada)
        const diffMin = Math.floor(diffMs / 60000)

        if (diffMin <= tarifa.tolerancia) return 0

        const horas = Math.ceil(diffMin / 60)
        return horas * tarifa.valorPorHora
    }

    function registrarSaida(ticketId) {
        const ticket = tickets.find(t => t.id === ticketId)
        if (!ticket) return null

        const valor = calcularValor(ticket)
        const horaSaida = new Date()

        setVagas(prev => prev.map(v => v.id === ticket.vagaId ? { ...v, status: StatusVaga.LIVRE}: v
        ))
        setTickets(prev => prev.filter(t => t.id !== ticketId))

        return {ticket, valor, horaSaida}
    }

    return {
        vagas, 
        tickets,
        tarifas,
        vagasPorTipo,
        vagasLivresPorTipo,
        registrarEntrada,
        registrarSaida,
        calcularValor
    }
}
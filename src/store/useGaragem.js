import { useState, useEffect } from 'react'
import { tarifasIniciais } from '../data/mockData'
import { StatusVaga } from '../types'

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export function useGaragem() {
  const [vagas, setVagas]     = useState([])
  const [tickets, setTickets] = useState([])
  const [tarifas, setTarifas] = useState(tarifasIniciais)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadState() {
      try {
        const response = await fetch(`${API_BASE}/state`)
        if (!response.ok) throw new Error('Falha ao carregar dados do backend')

        const data = await response.json()
        setVagas(data.vagas)
        setTickets(data.tickets)
        setTarifas(data.tarifas ?? tarifasIniciais)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadState()
  }, [])

  function vagasPorTipo(tipo) {
    return vagas.filter(v => v.tipo === tipo)
  }

  function vagasLivresPorTipo(tipo) {
    return vagas.filter(v => v.tipo === tipo && v.status === StatusVaga.LIVRE)
  }

  async function registrarEntrada({ placa, tipo }) {
    const response = await fetch(`${API_BASE}/entradas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placa, tipo }),
    })
    const data = await response.json()

    if (!response.ok) {
      return { erro: data.erro ?? 'Erro ao registrar entrada' }
    }

    setVagas(data.vagas)
    setTickets(data.tickets)

    return { ticket: data.ticket, vaga: data.vaga }
  }

  function calcularValor(ticket) {
    const tarifa  = tarifas.find(t => t.tipo === ticket.tipo)
    const diffMin = Math.floor((Date.now() - new Date(ticket.horaEntrada)) / 60000)

    if (diffMin <= tarifa.tolerancia) return 0

    const horas = Math.ceil(diffMin / 60)
    return horas * tarifa.valorPorHora
  }

  async function registrarSaida(ticketId) {
    const response = await fetch(`${API_BASE}/saidas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId }),
    })
    const data = await response.json()

    if (!response.ok) {
      return { erro: data.erro ?? 'Erro ao processar saída' }
    }

    setVagas(data.vagas)
    setTickets(data.tickets)

    return { ticket: data.ticket, valor: data.valor }
  }

  return {
    vagas,
    tickets,
    tarifas,
    vagasPorTipo,
    vagasLivresPorTipo,
    registrarEntrada,
    registrarSaida,
    calcularValor,
  }
}
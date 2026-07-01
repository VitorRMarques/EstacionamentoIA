import express from 'express'
import cors from 'cors'
import { vagasIniciais, tarifasIniciais } from '../src/data/mockData.js'
import { StatusVaga } from '../src/types/index.js'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

let state = {
  vagas: vagasIniciais,
  tickets: [],
  tarifas: tarifasIniciais,
}

function calcularValor(ticket) {
  const tarifa = state.tarifas.find(t => t.tipo === ticket.tipo)
  const diffMin = Math.floor((Date.now() - new Date(ticket.horaEntrada)) / 60000)
  if (diffMin <= tarifa.tolerancia) return 0
  const horas = Math.ceil(diffMin / 60)
  return horas * tarifa.valorPorHora
}

app.get('/api/state', (req, res) => {
  res.json(state)
})

app.post('/api/entradas', (req, res) => {
  const { placa, tipo } = req.body
  if (!placa || !tipo) {
    return res.status(400).json({ erro: 'Placa e tipo são obrigatórios.' })
  }

  const vagaLivre = state.vagas.find(v => v.tipo === tipo && v.status === StatusVaga.LIVRE)
  if (!vagaLivre) {
    return res.status(400).json({ erro: 'Nenhuma vaga disponível para este tipo de veículo.' })
  }

  const ticket = {
    id: crypto.randomUUID(),
    placa: placa.toUpperCase(),
    tipo,
    vagaId: vagaLivre.id,
    horaEntrada: new Date().toISOString(),
  }

  state.vagas = state.vagas.map(v =>
    v.id === vagaLivre.id ? { ...v, status: StatusVaga.OCUPADA } : v
  )
  state.tickets = [...state.tickets, ticket]

  res.json({ ticket, vaga: vagaLivre, vagas: state.vagas, tickets: state.tickets })
})

app.post('/api/saidas', (req, res) => {
  const { ticketId } = req.body
  const ticket = state.tickets.find(t => t.id === ticketId)
  if (!ticket) {
    return res.status(404).json({ erro: 'Ticket não encontrado.' })
  }

  const valor = calcularValor(ticket)
  state.vagas = state.vagas.map(v =>
    v.id === ticket.vagaId ? { ...v, status: StatusVaga.LIVRE } : v
  )
  state.tickets = state.tickets.filter(t => t.id !== ticketId)

  res.json({ ticket, valor, vagas: state.vagas, tickets: state.tickets })
})

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`)
})

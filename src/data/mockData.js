import { TipoVeiculo, StatusVaga } from '../types/index.js'

export const tarifasIniciais = [
  { tipo: TipoVeiculo.MOTO,     valorPorHora: 5,  tolerancia: 15 },
  { tipo: TipoVeiculo.CARRO,    valorPorHora: 10, tolerancia: 15 },
  { tipo: TipoVeiculo.SUV,      valorPorHora: 15, tolerancia: 15 },
  { tipo: TipoVeiculo.CAMINHAO, valorPorHora: 20, tolerancia: 15 },
]

export const vagasIniciais = [
  ...Array.from({ length: 6 }, (_, i) => ({
    id:     `A${String(i + 1).padStart(2, '0')}`,
    numero: `A${String(i + 1).padStart(2, '0')}`,
    tipo:   TipoVeiculo.MOTO,
    status: StatusVaga.LIVRE,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id:     `B${String(i + 1).padStart(2, '0')}`,
    numero: `B${String(i + 1).padStart(2, '0')}`,
    tipo:   TipoVeiculo.CARRO,
    status: StatusVaga.LIVRE,
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    id:     `C${String(i + 1).padStart(2, '0')}`,
    numero: `C${String(i + 1).padStart(2, '0')}`,
    tipo:   TipoVeiculo.SUV,
    status: StatusVaga.LIVRE,
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id:     `D${String(i + 1).padStart(2, '0')}`,
    numero: `D${String(i + 1).padStart(2, '0')}`,
    tipo:   TipoVeiculo.CAMINHAO,
    status: StatusVaga.LIVRE,
  })),
]
import { Injectable } from '@angular/core';
import { Despesa, TipoCategoriaClassificacao, MAPEAMENTO_CATEGORIAS } from '../models/despesa.model';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private readonly storageKey = 'despesas';
  private readonly creditoKey = 'credito';

  constructor() {}

  // Retorna todas as despesas
  getDespesas(): Despesa[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return []

    const despesas = JSON.parse(data)

    return despesas.map((d:any) => ({
      ...d, 
      data: new Date(d.data)
    }))
  }

  // Adiciona uma nova despesa
  addDespesa(despesa: Despesa): void {
    const despesas = this.getDespesas();
    despesas.push(despesa);
    localStorage.setItem(this.storageKey, JSON.stringify(despesas));
  }

  // Remove uma despesa pelo ID
  removeDespesa(id: number): void {
    const despesas = this.getDespesas().filter(d => d.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(despesas));
  }

  // Calcula o total gasto
  getTotal(): number {
    return this.getDespesas().reduce((sum, d) => sum + d.valor, 0);
  }

  // Retorna o crédito
  getCredito(): number {
    const data = localStorage.getItem(this.creditoKey);
    return data ? parseFloat(data) : 0;
  }

  // Define o crédito
  setCredito(credito: number): void {
    localStorage.setItem(this.creditoKey, credito.toString());
  }

  // Calcula o total gasto para categoria especificada (case-insensitive)
  getTotalPorCategoria(categoria: string): number {
    const cat = categoria.trim().toLowerCase();
    if (!cat) {
      return 0;
    }
    return this.getDespesas()
      .filter(d => d.categoria.trim().toLowerCase() === cat)
      .reduce((sum, d) => sum + d.valor, 0);
  }

  // Classifica uma categoria baseado no mapeamento
  classificarCategoria(categoria: string): TipoCategoriaClassificacao {
    const catLower = categoria.trim().toLowerCase();
    return MAPEAMENTO_CATEGORIAS[catLower] || 'Materiais';
  }
}

import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { DespesaService } from './services/despesa.service';
import { Despesa, TipoCategoriaClassificacao, MAPEAMENTO_CATEGORIAS } from './models/despesa.model';
import { TituloComponent } from './components/titulo/titulo.component';
import { CreditoInputComponent } from './components/credito-input/credito.component';
import { ItemsInputComponent } from "./components/items-input/items-input";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, DecimalPipe, DatePipe, TituloComponent, CreditoInputComponent, ItemsInputComponent]
})
export class App {
  private readonly despesaService = inject(DespesaService);

  despesaForm = new FormGroup({
    descricao: new FormControl('', Validators.required),
    valor: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    data: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required)
  });

  despesas = signal<Despesa[]>([]);

  credito = signal<number>(0);

  filtroCategoria = signal<string>('');

  filtroData = signal<string>('');

  totalGasto = computed(() => this.despesaService.getTotal());

  saldo = computed(() => this.credito() - this.totalGasto());

  despesasFiltradas = computed(() => {
    const filtroCat = this.filtroCategoria().trim().toLowerCase();
    const filtroDt = this.filtroData().trim();
    let filtered = this.despesas();

    if (filtroCat) {
      filtered = filtered.filter(despesa =>
        despesa.categoria.toLowerCase().includes(filtroCat) ||
        this.classificarCategoria(despesa.categoria).toLowerCase().includes(filtroCat)
      );
    }

    if (filtroDt) {
      filtered = filtered.filter(despesa => {
        const dataDespesa = new Date(despesa.data)
        const dataFiltro = new Date(filtroDt)

        return dataDespesa.toISOString().split('T')[0] === dataFiltro.toISOString().split('T')[0]
      }
        
      );
    }

    return filtered;
  });

  constructor() {
    this.carregarDespesas();
    this.credito.set(this.despesaService.getCredito());
  }

  carregarDespesas(): void {
    this.despesas.set(this.despesaService.getDespesas());
  }

  adicionarDespesa(): void {
    if (this.despesaForm.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const formValue = this.despesaForm.value;
    const novaDespesa: Despesa = {
      id: Date.now(),
      descricao: formValue.descricao!.trim(),
      valor: formValue.valor!,
      data: new Date(formValue.data!),
      categoria: formValue.categoria!.trim()
    };

    this.despesaService.addDespesa(novaDespesa);
    this.despesaForm.reset();
    this.carregarDespesas();
  }
  
  removerDespesa(id: number): void {
    this.despesaService.removeDespesa(id);
    this.carregarDespesas();
  }

  atualizarCredito(credito: number): void {
    this.credito.set(credito);
    this.despesaService.setCredito(credito);
  }

  classificarCategoria(categoria: string): TipoCategoriaClassificacao {
    return this.despesaService.classificarCategoria(categoria);
  }

  obterSugestoesCategoria(): string[] {
    return Object.keys(MAPEAMENTO_CATEGORIAS).sort();
  }

  atualizarFiltroCategoria(filtro: string): void {
    this.filtroCategoria.set(filtro);
  }

  atualizarFiltroData(filtro: string): void {
    this.filtroData.set(filtro);
  }

  limparFiltro(): void {
    this.filtroCategoria.set('');
    this.filtroData.set('');
  }
}

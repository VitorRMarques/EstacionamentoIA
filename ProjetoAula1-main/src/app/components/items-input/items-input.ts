import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items-input',
  imports: [],
  templateUrl: './items-input.html',
  styleUrl: './items-input.css',
})
export class ItemsInputComponent {
  @Input() despesasForm!: FormGroup
  @Input() sugestoesCategorias: string[] = []
  @Output() adicionarDespesa = new EventEmitter<void>()
}

import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-credito-input',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css'],
  standalone: true
})
export class CreditoInputComponent {
  @Input() credito: number = 0;
  @Output() creditoChange = new EventEmitter<number>();

  onCreditoChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value) || 0;
    this.creditoChange.emit(value);
  }
}
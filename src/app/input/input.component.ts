import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() id: string | undefined
  @Input() type!: string;
  @Input() label: string | undefined;
  @Input() src: string | undefined
  @Input() alt!: string;
  @Input() name!: string;
  @Input() isZero!: boolean;
  @Input() control: FormControl = new FormControl(); 
}

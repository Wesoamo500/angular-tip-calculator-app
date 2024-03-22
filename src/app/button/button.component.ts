import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent  {
  @Input() value!: string;
  @Input() isLast!: boolean;
  @Input() isInput!: boolean;
  @Input() isZero!: boolean ;

  customValue!: number;

 @Output() inputValue = new EventEmitter<number>()

 onChange(value: any){
  this.inputValue.emit(parseInt(value.target.value))
 }
}

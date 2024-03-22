import { Component, Pipe } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "./input/input.component";
import { ButtonComponent } from "./button/button.component";
import { OutputComponent } from "./output/output.component";
import { CommonModule, CurrencyPipe, JsonPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [RouterOutlet, ReactiveFormsModule, InputComponent, ButtonComponent, OutputComponent, JsonPipe, CurrencyPipe, CommonModule]
})
export class AppComponent{
  tipsForm = this.fb.group({
    bill: '',
    percentage:'',
    numberOfPeople: ''
  })
  constructor(private fb:FormBuilder){}

  getControl(name:string){
    return this.tipsForm.get(name) as FormControl
  }
 
  toggle = false;
  values = ['5%', '10%', '15%', '25%', '50%', 'Custom']
  total = 0;
  tip = 0;
  
  tipsPercentageSubject = new BehaviorSubject<number>(0);
  tipsPercentage = this.tipsPercentageSubject.asObservable()

  evaluate(value: any) {
    this.toggle = false
    if(value!=='Custom'){
      const parsedValue = parseFloat(value.replace('%', '')) / 100;
      this.tipsPercentageSubject.next(parsedValue)
    }
    this.hidden(this.tipsForm.value.numberOfPeople!)
    combineLatest([this.tipsPercentage, of(this.tipsForm.value.bill), of(this.tipsForm.value.numberOfPeople)]).subscribe(([tipsPercentage, bill, numberOfPeople])=>{
      this.tip = (parseFloat(bill!) * tipsPercentage) / parseInt(numberOfPeople!);
      this.total = this.tip + (parseFloat(bill!)/parseInt(numberOfPeople!));
    }).unsubscribe()
  }
  handleInputChange(inputValue:number){
    this.tipsPercentageSubject.next(inputValue/100)
  }
  isZero(){
    return parseInt(this.tipsForm.value.numberOfPeople!) === 0
  }
  hidden(value:string) {
    return parseInt(value) === 0 ? '' : 'hidden';
  }
  toggleInput() {
    this.toggle = true
  }
  reset() {
    this.total = 0;
    this.tip = 0;
  }
}

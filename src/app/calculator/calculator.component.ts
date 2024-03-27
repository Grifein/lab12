import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstNumber: number | null = null;
  operator: string | null = null;
  waitForSecondNumber = false;

  constructor() {}

  ngOnInit(): void {}

  getNumber(value: string): void {
    if (this.waitForSecondNumber) {
      this.currentNumber = value;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = value : this.currentNumber += value;
    }
  }

  getDecimal(): void {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  private performCalculation(operator: string, secondOperand: number): number {
    const firstOperand = this.firstNumber || 0;
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  getOperation(op: string): void {
    if (this.firstNumber === null) {
      this.firstNumber = parseFloat(this.currentNumber);
    } else if (this.operator) {
      const result = this.performCalculation(this.operator, parseFloat(this.currentNumber));
      this.currentNumber = String(result);
      this.firstNumber = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
  }

  clear(): void {
    this.currentNumber = '0';
    this.firstNumber = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}

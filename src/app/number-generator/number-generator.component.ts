import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-number-generator',
  templateUrl: './number-generator.component.html',
  styleUrls: ['./number-generator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberGeneratorComponent {
  filterNumber!: number;
  inputNumber!: number;
  generatedNumbers: string[] = [];
  groupedNumbers: string[][] = [];
  title: string = 'FizzBuzz';

  generateNumbers(): void {
    this.generatedNumbers = [];
    if (this.inputNumber > 0) {
      for (let i = 1; i <= this.inputNumber; i++) {
        this.addToGeneratedList(i);
      }
      this.groupNumbers();
    }
  }

  addToGeneratedList(i: number): void {
    if (i % 3 === 0 && i % 5 === 0) {
      this.generatedNumbers.push('FizzBuzz');
    } else if (i % 3 === 0) {
      this.generatedNumbers.push('Fizz');
    } else if (i % 5 === 0) {
      this.generatedNumbers.push('Buzz');
    } else {
      this.generatedNumbers.push(i.toString());
    }
  }

  groupNumbers(): void {
    this.groupedNumbers = [];
    for (let i = 0; i <= this.generatedNumbers.length; i += 15) {
      this.groupedNumbers.push(this.generatedNumbers.slice(i, i + 15));
    }
  }

  addNumbers(): void {
    const currentLength = this.generatedNumbers.length;
    const nextNumber = currentLength + 1;
    const endNumber = nextNumber + 14;
    console.log(this.filterNumber);

    for (let i = nextNumber; i <= endNumber; i++) {
      this.addToGeneratedList(i);
    }
    this.groupNumbers();
  }

  filterNumbers(): void {
    if (this.filterNumber > 0) {
      this.generatedNumbers = this.generatedNumbers.filter((number) => {
        return number.includes(this.filterNumber.toString());
      });
      this.groupNumbers();
    } else {
      this.generateNumbers();
    }
  }

  getCellStyle(number: string): object {
    let style = {};
    if (number === 'Fizz' || number === 'Buzz' || number === 'FizzBuzz') {
      return { 'background-color': 'red' };
    } else {
      return style;
    }
  }
}

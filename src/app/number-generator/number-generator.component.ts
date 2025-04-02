import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-number-generator',
  templateUrl: './number-generator.component.html',
  styleUrls: ['./number-generator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberGeneratorComponent {
  filterNumberSubject = new BehaviorSubject<string>('');
  inputNumberSubject = new BehaviorSubject<number>(0);

  numbers$ = this.inputNumberSubject.pipe(
    map((count) => this.generateNumbers(count))
  );

  filteredNumbers$ = combineLatest([
    this.numbers$,
    this.filterNumberSubject,
  ]).pipe(
    map(([numbers, filter]) => {
      if (filter) {
        return numbers.filter((num) => num.includes(filter));
      }
      return numbers;
    })
  );

  title: string = 'FizzBuzz';

  generateNumbers(count: number): string[] {
    return Array.from({ length: count }, (_, i) => this.getText(i + 1));
  }

  getText(i: number): string {
    if (i % 3 === 0 && i % 5 === 0) {
      return 'FizzBuzz';
    } else if (i % 3 === 0) {
      return 'Fizz';
    } else if (i % 5 === 0) {
      return 'Buzz';
    } else {
      return i.toString();
    }
  }

  updateCount(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value ?? '';

    if (Number(value) > 0) {
      this.inputNumberSubject.next(Number(value));
    }
  }

  filterNumbers(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value ?? '';

    this.filterNumberSubject.next(value);
  }

  addNumbers(): void {
    const currentNumbers = this.inputNumberSubject.value;
    this.inputNumberSubject.next(currentNumbers + 15);
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

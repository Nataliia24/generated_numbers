import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberGeneratorComponent } from './number-generator.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('NumberGeneratorComponent', () => {
  let component: NumberGeneratorComponent;
  let fixture: ComponentFixture<NumberGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberGeneratorComponent],
      imports: [ScrollingModule, CommonModule, FormsModule],
    });
    fixture = TestBed.createComponent(NumberGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "FizzBuzz"', () => {
    expect(component.title).toEqual('FizzBuzz');
  });

  it('should group numbers correctly into groups of 15', () => {
    component.generatedNumbers = Array.from({ length: 29 }, (_, i) =>
      (i + 1).toString()
    );
    component.groupNumbers();

    expect(component.groupedNumbers.length).toBe(2);
    expect(component.groupedNumbers[0].length).toBe(15);
    expect(component.groupedNumbers[1].length).toBe(14);
  });

  it('should not generate numbers when inputNumber is 0 or negative', () => {
    component.inputNumber = 0;
    component.generateNumbers();
    expect(component.generatedNumbers.length).toBe(0);
    expect(component.groupedNumbers.length).toBe(0);
  });

  it('should not generate numbers when inputNumber is negative', () => {
    component.inputNumber = -5;
    component.generateNumbers();
    expect(component.generatedNumbers.length).toBe(0);
    expect(component.groupedNumbers.length).toBe(0);
  });

  it('should filter numbers correctly when filterNumber is positive', () => {
    component.filterNumber = 5;
    component.generatedNumbers = ['1', '12', '15', '25', '35'];

    component.filterNumbers();
    expect(component.generatedNumbers).toEqual(['15', '25', '35']);
    expect(component.groupedNumbers.length).toBeGreaterThan(0); // Групи мають бути створені
  });

  it('should call generateNumbers when filterNumber is not positive', () => {
    component.filterNumber = 0;
    spyOn(component, 'generateNumbers');
    component.filterNumbers();
    expect(component.generateNumbers).toHaveBeenCalled();
  });

  it('should return red background for "Fizz", "Buzz", or "FizzBuzz"', () => {
    let result = component.getCellStyle('Fizz');
    expect(result).toEqual({ 'background-color': 'red' });

    result = component.getCellStyle('Buzz');
    expect(result).toEqual({ 'background-color': 'red' });

    result = component.getCellStyle('FizzBuzz');
    expect(result).toEqual({ 'background-color': 'red' });
  });

  it('should return an empty object for other values', () => {
    let result = component.getCellStyle('1');
    expect(result).toEqual({});

    result = component.getCellStyle('2');
    expect(result).toEqual({});

    result = component.getCellStyle('Foo');
    expect(result).toEqual({});
  });

  it('should add "Fizz" for numbers divisible by 3', () => {
    component.addToGeneratedList(3);
    expect(component.generatedNumbers).toContain('Fizz');

    component.addToGeneratedList(6);
    expect(component.generatedNumbers).toContain('Fizz');

    component.addToGeneratedList(9);
    expect(component.generatedNumbers).toContain('Fizz');
  });

  it('should add "Buzz" for numbers divisible by 5', () => {
    component.addToGeneratedList(5);
    expect(component.generatedNumbers).toContain('Buzz');

    component.addToGeneratedList(10);
    expect(component.generatedNumbers).toContain('Buzz');

    component.addToGeneratedList(20);
    expect(component.generatedNumbers).toContain('Buzz');
  });

  it('should add "FizzBuzz" for numbers divisible by both 3 and 5', () => {
    component.addToGeneratedList(15);
    expect(component.generatedNumbers).toContain('FizzBuzz');

    component.addToGeneratedList(30);
    expect(component.generatedNumbers).toContain('FizzBuzz');

    component.addToGeneratedList(45);
    expect(component.generatedNumbers).toContain('FizzBuzz');
  });

  it('should add the number itself for numbers not divisible by 3 or 5', () => {
    component.addToGeneratedList(1);
    expect(component.generatedNumbers).toContain('1');

    component.addToGeneratedList(2);
    expect(component.generatedNumbers).toContain('2');

    component.addToGeneratedList(4);
    expect(component.generatedNumbers).toContain('4');
  });
});

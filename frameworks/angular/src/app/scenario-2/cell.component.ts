import { Component, Input } from '@angular/core';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
})
export class Cell {
  @Input() value: number;

  count = 0;

  increment() {
    this.count += 1;
  }
}

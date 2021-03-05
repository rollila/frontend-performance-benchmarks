import { Component } from '@angular/core';

@Component({
  selector: 'scenario2',
  templateUrl: './scenario2.component.html',
})
export class Scenario2 {
  numRows = 0;
  numColumns = 0;
  rows = [];

  generate() {
    this.rows = new Array(this.numRows).fill(null).map((_, i) => ({
      id: i,
      columns: new Array(this.numColumns).fill(null).map((_, y) => ({
        id: `row${i}-col${y}`,
      })),
    }));
  }

  onUpdateColumns(event) {
    this.numColumns = parseInt(event.target.value, 10);
  }

  onUpdateRows(event) {
    this.numRows = parseInt(event.target.value, 10);
  }

  trackBy(item) {
    return item.id;
  }
}

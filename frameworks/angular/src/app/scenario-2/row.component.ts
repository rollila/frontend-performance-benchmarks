import { Component, Input } from '@angular/core';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
})
export class Row {
  @Input() columns: any[];

  count = 0;
  offset = 0;

  onInput() {
    this.count += 1;
  }
  updateRow() {
    this.offset += 1;
  }
  trackBy(item) {
    return item.id;
  }
}

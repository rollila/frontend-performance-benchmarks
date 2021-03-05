import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc2-child',
  template: ` <div>
    <div *ngFor="let element of elements; trackBy: trackBy">
      {{ element.id }}
    </div>
  </div>`,
})
export class Child {
  @Input() numElements: number;

  get elements() {
    return new Array(this.numElements).fill(null).map((_, i) => ({ id: i }));
  }

  trackBy(i, item) {
    return item.id;
  }
}

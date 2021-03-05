import { Component } from '@angular/core';

@Component({
  selector: 'scenario4',
  templateUrl: './scenario4.component.html',
})
export class Scenario4 {
  children = [];
  numChildren = 0;

  generate() {
    this.children = this.children = new Array(this.numChildren)
      .fill(null)
      .map((_, i) => ({ id: i, value: i }));
  }
  update() {
    this.children = this.children.map((child) => ({
      ...child,
      value: (child.value += 1),
    }));
  }
  updateSingle() {
    const i = Math.floor(Math.random() * Math.floor(this.children.length));
    this.children[i].value += 1;
  }
  onChange(event) {
    this.numChildren = parseInt(event.target.value, 10);
  }

  trackBy(i, item) {
    return item.id;
  }
}

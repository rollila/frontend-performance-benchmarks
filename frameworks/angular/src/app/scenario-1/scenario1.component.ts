import { Component } from '@angular/core';

@Component({
  selector: 'scenario1',
  templateUrl: './scenario1.component.html',
})
export class Scenario1 {
  children = [];
  elements = [];
  numChildren = 0;
  childType = 1;

  addOne() {
    this.children.push({ id: this.children.length });
  }
  remove() {
    this.children = [];
  }
  switchType() {
    this.childType = 2;
  }
  generateComponents() {
    this.children = new Array(this.numChildren)
      .fill(null)
      .map((_, i) => ({ id: i }));
  }
  generateElements() {
    this.elements = new Array(this.numChildren).fill(null);
  }
  onUpdateValue(event) {
    this.numChildren = parseInt(event.target.value, 10);
  }

  trackBy(i, item) {
    return item.id;
  }
}

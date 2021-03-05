import { Component, Input } from '@angular/core';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
})
export class Node {
  @Input() branches: number[];
  @Input() subtreeDepth: number;

  count = 0;

  increment() {
    this.count += 1;
  }
}

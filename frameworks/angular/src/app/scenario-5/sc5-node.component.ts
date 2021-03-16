import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc5-node',
  templateUrl: './sc5-node.component.html',
})
export class Sc5Node {
  @Input() branches: number[];
  @Input() subtreeDepth: number;

  count = 0;

  increment() {
    this.count += 1;
  }
}

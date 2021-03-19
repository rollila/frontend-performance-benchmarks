import { Component, Input } from '@angular/core';

@Component({
  selector: 'node2',
  templateUrl: './node2.component.html',
})
export class Node2 {
  @Input() branches: number[];
  @Input() subtreeDepth: number;
}

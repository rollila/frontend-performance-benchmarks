import { Component } from '@angular/core';

@Component({
  selector: 'scenario3',
  templateUrl: './scenario3.component.html',
})
export class Scenario3 {
  branchingFactor = 0;
  branches = [];
  treeDepth = 0;
  initialized = false;
  count = 0;

  onUpdateBranchingFactor(event) {
    this.branchingFactor = parseInt(event.target.value, 10);
    this.branches = Array(this.branchingFactor)
      .fill(null)
      .map((_, i) => i);
  }
  onUpdateTreeDepth(event) {
    this.treeDepth = parseInt(event.target.value, 10);
  }
  generate() {
    this.initialized = true;
  }
  increment() {
    this.count += 1;
  }
}

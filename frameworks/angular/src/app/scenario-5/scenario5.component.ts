import { Component } from '@angular/core';

@Component({
  selector: 'scenario5',
  templateUrl: './scenario5.component.html',
})
export class Scenario5 {
  branchingFactor = 0;
  branches = [];
  treeDepth = 0;
  initialized = false;
  count = 0;
  prop = 0;

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
  updateTree() {
    this.prop += 1;
  }
}

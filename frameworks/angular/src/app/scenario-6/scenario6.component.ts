import { Component } from '@angular/core';

@Component({
  selector: 'scenario6',
  templateUrl: './scenario6.component.html',
})
export class Scenario6 {
  branchingFactor = 0;
  branches = [];
  treeDepth = 0;
  initialized = false;
  count = 0;
  items = Array(10)
    .fill(null)
    .map(() => ({
      value0: 0,
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
      value5: 5,
      value6: 6,
      value7: 7,
      value8: 8,
      value9: 9,
    }));

  onUpdateBranchingFactor(event) {
    this.branchingFactor = parseInt(event.target.value, 10);
    this.branches = Array(this.branchingFactor)
      .fill(null)
      .map((_, i) => i);
    console.log(this.branches);
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

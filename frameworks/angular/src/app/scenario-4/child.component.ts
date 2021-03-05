import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc4-child',
  templateUrl: './child.component.html',
})
export class Child {
  @Input() value: number;
}

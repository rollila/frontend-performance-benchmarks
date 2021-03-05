import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc1-child2',
  template: ` <span>{{ id }}</span>`,
})
export class Child2 {
  @Input() id: number;
}

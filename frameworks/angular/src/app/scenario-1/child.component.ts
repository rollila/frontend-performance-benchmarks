import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc1-child',
  template: ` <div>{{ id }}</div>`,
})
export class Child {
  @Input() id: number;
}

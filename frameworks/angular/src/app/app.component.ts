import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  selectedScenario = null;

  selectScenario(value) {
    this.selectedScenario = parseInt(value, 10);
  }
}

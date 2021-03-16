import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Scenario1 } from './scenario-1/scenario1.component';
import { Child as Scenario1Child } from './scenario-1/child.component';
import { Child2 as Scenario1Child2 } from './scenario-1/child2.component';
import { Scenario2 } from './scenario-2/scenario2.component';
import { Row } from './scenario-2/row.component';
import { Cell } from './scenario-2/cell.component';
import { Scenario3 } from './scenario-3/scenario3.component';
import { Node } from './scenario-3/node.component';
import { Scenario4 } from './scenario-4/scenario4.component';
import { Child as Scenario4Child } from './scenario-4/child.component';
import { Scenario5 } from './scenario-5/scenario5.component';
import { Sc5Node } from './scenario-5/sc5-node.component';
@NgModule({
  declarations: [
    AppComponent,
    Scenario1,
    Scenario1Child,
    Scenario1Child2,
    Scenario2,
    Row,
    Cell,
    Scenario3,
    Node,
    Scenario4,
    Scenario4Child,
    Scenario5,
    Sc5Node,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

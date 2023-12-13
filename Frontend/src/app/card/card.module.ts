import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { ACardComponent } from './a-card/a-card.component';
import { ECardComponent } from './e-card/e-card.component';
import { DCardComponent } from './d-card/d-card.component';
import { GCardComponent } from './g-card/g-card.component';
import { LCardComponent } from './l-card/l-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ACardComponent,
    ECardComponent,
    DCardComponent,
    GCardComponent,
    LCardComponent
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    FormsModule
  ]
})
export class CardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AAddressComponent } from './a-address/a-address.component';
import { EAddressComponent } from './e-address/e-address.component';
import { DAddressComponent } from './d-address/d-address.component';
import { GAddressComponent } from './g-address/g-address.component';
import { LAddressComponent } from './l-address/l-address.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AAddressComponent,
    EAddressComponent,
    DAddressComponent,
    GAddressComponent,
    LAddressComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    FormsModule
  ]
})
export class AddressModule { }

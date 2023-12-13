import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AAddressComponent } from './a-address/a-address.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { AddressGuard } from '../_helpers/address.guard';
import { EAddressComponent } from './e-address/e-address.component';
import { GAddressComponent } from './g-address/g-address.component';

const routes: Routes = [

  { path: 'add', component: AAddressComponent, canActivate: [AuthGuard, AddressGuard] },
  { path: 'edit/:id', component: EAddressComponent, canActivate: [AuthGuard, AddressGuard] },
  { path: ':idCours', component: GAddressComponent, canActivate: [AuthGuard, AddressGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }

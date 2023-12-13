import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACardComponent } from './a-card/a-card.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { AddressGuard } from '../_helpers/address.guard';
import { ECardComponent } from './e-card/e-card.component';
import { GCardComponent } from './g-card/g-card.component';

const routes: Routes = [
  { path: 'add', component: ACardComponent, canActivate: [AuthGuard, AddressGuard] },
  { path: 'edit/:id', component: ECardComponent, canActivate: [AuthGuard, AddressGuard] },
  { path: ':idCours', component: GCardComponent, canActivate: [AuthGuard, AddressGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }

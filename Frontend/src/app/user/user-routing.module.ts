import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { AUserComponent } from './a-user/a-user.component';
import { EUserComponent } from './e-user/e-user.component';
import { UserGuard } from '../_helpers/user.guard';
import { GUserComponent } from './g-user/g-user.component';
import { LUserComponent } from './l-user/l-user.component';

const routes: Routes = [
  { path: 'add', component: AUserComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'edit/:id', component: EUserComponent, canActivate: [AuthGuard, UserGuard] },
  { path: ':idCours', component: GUserComponent, canActivate: [AuthGuard, UserGuard] },
  { path: '', component: LUserComponent, canActivate: [AuthGuard, UserGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

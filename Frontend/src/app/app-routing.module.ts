import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'address', loadChildren: () => import('./address/address.module')
      .then(m => m.AddressModule), canActivate: [AuthGuard]
  },
  {
    path: 'home', loadChildren: () => import('./display/display.module')
      .then(m => m.DisplayModule), canActivate: [AuthGuard]
  },
  {
    path: 'card', loadChildren: () => import('./card/card.module')
      .then(m => m.CardModule), canActivate: [AuthGuard]
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule), canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

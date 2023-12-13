import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AUserComponent } from './a-user/a-user.component';
import { EUserComponent } from './e-user/e-user.component';
import { DUserComponent } from './d-user/d-user.component';
import { GUserComponent } from './g-user/g-user.component';
import { LUserComponent } from './l-user/l-user.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AUserComponent,
    EUserComponent,
    DUserComponent,
    GUserComponent,
    LUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule

  ]
})
export class UserModule { }

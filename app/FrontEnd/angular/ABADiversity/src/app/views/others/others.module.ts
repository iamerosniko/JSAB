import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoaccessComponent } from './noaccess/noaccess.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RedirectingComponent } from './redirecting/redirecting.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NoaccessComponent, LoginComponent, LogoutComponent, RedirectingComponent]
})
export class OthersModule { }

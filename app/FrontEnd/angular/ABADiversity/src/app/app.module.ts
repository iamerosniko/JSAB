import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { SurveysModule } from './views/surveys/surveys.module';
import { ReportsModule } from './views/reports/reports.module';
import { OthersModule } from './views/others/others.module';
import { AuthGuard } from './auth-guard.services';
import { HttpModule } from '@angular/http'
import { ClientApiService,ClientApiSettings,LoginService } from './services/aba.services';
import { TopNavComponent } from './views/main/top-nav/top-nav.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    SurveysModule,
    ReportsModule,
    OthersModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthGuard,ClientApiService,ClientApiSettings,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

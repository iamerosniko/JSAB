import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './views/reports/reports.component';
import { SurveysComponent } from './views/surveys/surveys.component';

import { NoaccessComponent } from './views/others/noaccess/noaccess.component';
import { LoginComponent } from './views/others/login/login.component';
import { LogoutComponent } from './views/others/logout/logout.component';
import { RedirectingComponent } from './views/others/redirecting/redirecting.component';

import { AuthGuard } from './auth-guard.services';
import { SurveyBodyComponent } from './views/surveys/survey-body/survey-body.component';
const routes: Routes = [
  // { path: '', redirectTo:'/Survey', pathMatch:"full" },
  // { path: 'Reports', component : ReportsComponent },
  // { path: 'Survey', component : SurveysComponent},
 

  { path: '', redirectTo:'/Survey', pathMatch:"full" },
  { path: 'Login', component:LoginComponent},
  { path: 'Redirecting', component : RedirectingComponent},
  { path: 'Logout', component:LogoutComponent},
  { path: 'Noaccess', component:NoaccessComponent},
  { 
    path: 'Reports', component : ReportsComponent,
  children: [
    // { path: 'RaceAcrossthePosition', component : RacePositionComponent, outlet:'reportroute' },
    // { path: 'PositionAcrosstheRace', component : PositionRaceComponent, outlet:'reportroute' }
]
},
  // , canActivate:[AuthGuard]
  {
    path:'Survey', component:SurveysComponent,
    children:[
      { path: 'NewSurvey', component : SurveyBodyComponent, outlet:'surveyroute'},
      { path: 'NewSurvey/:FirmID', component : SurveyBodyComponent, outlet:'surveyroute' }
    ], 
  },

  // { path: '**', redirectTo :'/Survey' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {
      useHash:true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

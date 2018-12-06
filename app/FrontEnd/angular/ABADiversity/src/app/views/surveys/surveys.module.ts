import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysComponent } from './surveys.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SaveBarComponent } from './save-bar/save-bar.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { FirmDemographicsComponent } from './firm-demographics/firm-demographics.component';
import { FirmLeadershipDemographicComponent } from './firm-leadership-demographic/firm-leadership-demographic.component';
import { LawyersLeftComponent } from './lawyers-left/lawyers-left.component';
import { LawyersJoinedComponent } from './lawyers-joined/lawyers-joined.component';
import { LawyersReducedHoursComponent } from './lawyers-reduced-hours/lawyers-reduced-hours.component';
import { TopTenHighestCompensatedPartnersComponent } from './top-ten-highest-compensated-partners/top-ten-highest-compensated-partners.component';
import { UndertakenInitiativesComponent } from './undertaken-initiatives/undertaken-initiatives.component';
import { PromotionsAssocPartnerComponent } from './promotions-assoc-partner/promotions-assoc-partner.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SurveyBodyComponent } from './survey-body/survey-body.component';
import { RouterModule } from '@angular/router'

import { SurveyService } from '../../services/survey.service'
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  declarations: [SurveysComponent,SideNavComponent,SaveBarComponent,CompanyProfileComponent,FirmDemographicsComponent, FirmLeadershipDemographicComponent, LawyersLeftComponent, LawyersJoinedComponent, LawyersReducedHoursComponent, TopTenHighestCompensatedPartnersComponent, UndertakenInitiativesComponent, PromotionsAssocPartnerComponent, SurveyBodyComponent],
  providers:[SurveyService]
})
export class SurveysModule { }

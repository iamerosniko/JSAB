
import { Injectable } from '@angular/core';
import { ClientApiService } from './clientapi.service'; 
import { ClientApiSettings } from './clientapi.settings'; 
import { Survey } from '../entities/survey';

@Injectable()
export class SurveyService {

  constructor(private api:ClientApiService) {
    //uncomment api.authorizedHeader() if AD Authentication is enabled.
    //use api.normalHeader() if anonymous authentication is enabled.
    //api.authorizedHeader();
  }

  // getSurveys() {
  //   this.api.normalHeader();
  //   this.api.apiUrl=ClientApiSettings.GETBWURL("FESurvey")
  //   return this.api.getAll();
  // }

  getFirms(){
    this.api.authorizedHeader();
    this.api.apiUrl=ClientApiSettings.GETBWURL("Firms")
    return this.api.getAll();
  }

  getYears(firmID: string) {
    this.api.authorizedHeader();
    this.api.apiUrl=ClientApiSettings.GETBWURL("Survey/GetYears/"+firmID)
    return this.api.getAll();
  }

  getSurvey(companyID:string,mode:number){
    this.api.authorizedHeader();
    this.api.apiUrl=ClientApiSettings.GETBWURL("Survey/GetSurvey/"+companyID+"/"+mode)
    return this.api.getAll();
  }

  getSurveys(firmID:string){
    this.api.authorizedHeader();
    this.api.apiUrl=ClientApiSettings.GETBWURL("Survey/"+firmID)
    return this.api.getAll();
  }

  postSurvey(surveyObj: Survey) {
    this.api.authorizedHeader();
    this.api.apiUrl=ClientApiSettings.GETBWURL("Survey")
    var body = JSON.stringify(surveyObj);
    return this.api.postData(body);
  } 

  // putSurvey(application: any) {
  //   this.api.normalHeader();
  //   this.api.apiUrl=ClientApiSettings.GETBWURL("Survey")
  //   var body = JSON.stringify(application);
  //   return this.api.putData(application.AppID.toString(),body );
  // }

  // deleteSurvey(applicationID: string) {
  //   this.api.normalHeader();
  //   this.api.apiUrl=ClientApiSettings.GETBWURL("FESurvey")
  //   return this.api.deleteData(applicationID);
  // }
}

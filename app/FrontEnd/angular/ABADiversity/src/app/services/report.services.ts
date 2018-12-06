
import { Injectable, group } from '@angular/core';
import { ClientApiService } from './clientapi.service'; 
import { ClientApiSettings } from './clientapi.settings'; 
import { Firms } from '../entities/firms';

@Injectable()
export class ReportService {

  constructor(private api:ClientApiService) {
    //uncomment api.authorizedHeader() if AD Authentication is enabled.
    //use api.normalHeader() if anonymous authentication is enabled.
    //api.authorizedHeader();
  }

  //use RoleVSRoles entity and RolesValues
  getRaceVsRoles(firmID : string, category:number, BaseSurvey:string, TopSurvey:string)
  {
    this.api.authorizedHeader();
    this.api.apiUrl=ClientApiSettings.GETBWURL("Reports/GetReportRaceVSRole/") +  firmID + "/" + category + "/" + BaseSurvey + "/" +TopSurvey
    return this.api.getAll();
  }
  getMinorities(firmID : string, category:number, BaseSurvey:string, TopSurvey:string)
  {
    this.api.authorizedHeader();
    this.api.apiUrl=ClientApiSettings.GETBWURL("Reports/GetMinorities/") +  firmID + "/" + category + "/" + BaseSurvey + "/" +TopSurvey
    return this.api.getAll();
  }
  getDiversityRanking(firms:Firms[],Group:number ,Pos:number ,BaseYear:number ,TopYear:number){
    this.api.authorizedHeader();
    //yan mali mo pinasa mo ung frims nde position
    this.api.apiUrl=ClientApiSettings.GETBWURL("Reports/GetDiversityRanking/") + "/" + Group + "/"+ Pos +"/"+ BaseYear + "/" + TopYear
    var body = JSON.stringify(firms);
    return this.api.postData(body);
  }
  getCompanyProfileYears(){
    this.api.authorizedHeader();
    this.api.apiUrl=ClientApiSettings.GETBWURL("Reports/GetCompanyProfileYears/")
    return this.api.getAll();
  }
  getFirmsAvailable(BaseYear ,TopYear){
    this.api.authorizedHeader();
    this.api.apiUrl=ClientApiSettings.GETBWURL("Reports/GetFirmsAvailable/") + BaseYear + "/" + TopYear
    return this.api.getAll();
  }
}

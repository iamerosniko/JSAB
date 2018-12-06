import { Injectable } from '@angular/core';
import { ClientApiService } from './clientapi.service'; 
import { ClientApiSettings } from './clientapi.settings'; 
import { AppSignIn, UserAppRole, AppToken } from '../entities/btam';
@Injectable()
export class LoginService {

  constructor(private api:ClientApiService) {
    api.normalHeader();
  }

  getBtamURL(){
    
    this.api.normalHeader();
    this.api.apiUrl=ClientApiSettings.GETCLIENTAPIURL("BTAMConnection/GetBTAMURL")
    var res= this.api.getAll();
    return res;
  }

  getUserName(){
    this.api.normalHeader();

    this.api.apiUrl=ClientApiSettings.GETCLIENTAPIURL("BTAMConnection/GetUserName");
    var res= this.api.getAll();
    return res;
  }

  getAppSignIn(appSignIn:AppSignIn){
    this.api.normalHeader();

    this.api.apiUrl=sessionStorage.getItem("BTAMURL")+"AppSignIn";
    var body = JSON.stringify(appSignIn);
    return this.api.postData(body);
  }

  GetAuthenticationToken(userAppRole:UserAppRole){
    this.api.normalHeader();

    this.api.apiUrl=sessionStorage.getItem("BTAMURL")+"Authenticate/139cf13a-9ce8-7437-b4e7-08c45d3b454d";
    var body = JSON.stringify(userAppRole);
    return this.api.postData(body);
  }

  GetAuthorizationToken(token:AppToken){
    this.api.normalHeader();

    this.api.apiUrl=ClientApiSettings.GETCLIENTAPIURL("BTAMConnection/GetAuthorizationUser");
    var body = JSON.stringify(token);
    return this.api.postData(body);
  }
  
}

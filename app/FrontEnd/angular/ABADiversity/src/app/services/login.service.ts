import { Injectable } from '@angular/core';
import { ClientApiService } from './clientapi.service'; 
import { ClientApiSettings } from './clientapi.settings'; 
import { AppSignIn, UserAppRole, AppToken } from '../entities/btam';
@Injectable()
export class LoginService {

  constructor(private api:ClientApiService) {
    api.normalHeader();
  }

  getAppSignIn(){
    this.api.normalHeader();
    this.api.apiUrl=ClientApiSettings.GETCLIENTAPIURL("BTAMConnection/AppSignIn");
    return this.api.getAll();
  }
  
}

import { Component, OnInit } from '@angular/core';
import { AppSignIn, AppToken, BtamEntity, UserAppRole } from '../../../entities/btam';
import { LoginService } from '../../../services/aba.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  public currentUser:UserAppRole={ Role:''};

  constructor(private loginSvc : LoginService,private router: Router){}

  async ngOnInit(){
    try{
      var BTAMURL = <BtamEntity>await this.loginSvc.getBtamURL();
      sessionStorage.setItem("BTAMURL",BTAMURL.BTAMURL);
      var user = <UserAppRole>await this.loginSvc.getUserName();
      // var user = <UserAppRole> {UserName:"alverer@mfcgd.com"};
      // console.log(user)
      // var host = "abadiversityclientlocal.azurewebsites.net"
      var host = window.location.host;
      var appSignIn = <AppSignIn> { AppURL:host,UserName:user.UserName};
      this.currentUser = await this.loginSvc.getAppSignIn(appSignIn);
      // console.log(this.currentUser)
      // console.log(host)
      // console.log(this.currentUser.Role!='')
      if(this.currentUser!=null){
        var authenticationToken = <AppToken> await this.loginSvc.GetAuthenticationToken(this.currentUser);
        var authorizationToken = <AppToken> await this.loginSvc.GetAuthorizationToken(authenticationToken);
        sessionStorage.setItem("ATT",authenticationToken.Token);
        sessionStorage.setItem("ATR",authorizationToken.Token);
        this.router.navigate(['./Survey']) 
      }
      else{
        //redirect
        this.router.navigate(['./Noaccess']) 
      }    
    }catch{
      this.router.navigate(['./Noaccess']) 
    }
  }


  getName(){
    if(this.currentUser!=null)
    return this.currentUser.FirstName+' '+this.currentUser.LastName;
    //console.log(this.currentUser)
  }
  

}

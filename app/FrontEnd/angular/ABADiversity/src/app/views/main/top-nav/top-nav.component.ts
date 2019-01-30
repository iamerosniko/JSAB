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
     
      this.currentUser = await this.loginSvc.getAppSignIn();
      console.log(this.currentUser)
      if(this.currentUser!=null){
        var authenticationToken =this.currentUser.AuthenticationToken;
        var authorizationToken = this.currentUser.AuthorizationToken;
        sessionStorage.setItem("ATT",authenticationToken);
        sessionStorage.setItem("ATR",authorizationToken);
        this.router.navigate(['./Reports']) 
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

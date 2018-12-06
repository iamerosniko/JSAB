import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/aba.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService :LoginService,private router: Router) { }

  ngOnInit() {
    this.Login();
  }

  async Login(){
    // var authenticationToken = await this.loginService.GetAuthenticationToken();
    // var authorizationToken = await this.loginService.GetAuthorizationToken();    
    // var currentUser = await this.loginService.GetCurrentUser(authenticationToken);
    // await sessionStorage.setItem("Cache0",authenticationToken);
    // await sessionStorage.setItem("Cache1",authorizationToken);
    // await sessionStorage.setItem("Cache2",window.btoa(JSON.stringify(currentUser)));


    // setTimeout(() => {
    //   this.router.navigate(['./Redirecting']) 
    // }, 3000);
  }
}

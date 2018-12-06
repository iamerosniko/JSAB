import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    constructor ( private router: Router) {}

    // canActivate() : boolean {
    //     // if (!this.userService.isAuthenticated) {
    //     //     this.router.navigate(['/signin']);
    //     // }
    //     // return this.userService.isAuthenticated;
    //     // let isAllowed: boolean = false;
    //     // if(sessionStorage.getItem('Cache0')==null){
    //     //     this.router.navigate(['./Login']) 
    //     // }
    //     // else{
    //     //     isAllowed=true;
    //     // }
    //     // console.log('authguard activated');
    //     // return isAllowed;
    // }

    canActivate():boolean {
        return true;
    }

    canActivateChild() : boolean {
        return  this.canActivate();
    }
}
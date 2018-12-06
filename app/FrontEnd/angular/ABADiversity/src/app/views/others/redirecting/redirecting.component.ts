import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirecting',
  templateUrl: './redirecting.component.html',
  styleUrls: ['./redirecting.component.css']
})
export class RedirectingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.getValidRoutes();
  }

  getValidRoutes(){
    //get all modules of the current user
    //iff null goto noaccess
    setTimeout(() => {
      this.router.navigate(['./Survey']);
    }, 2000);

    
  }
}

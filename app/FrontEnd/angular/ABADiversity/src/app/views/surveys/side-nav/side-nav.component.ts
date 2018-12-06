import { Component, OnInit, OnChanges } from '@angular/core';
import { Firms } from '../../../entities/entities';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../../services/survey.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit,OnChanges {
  mainList:Firms[]=[];
  firmlist:Firms[]=[];
  firm:Firms={};
  myFirm: FormGroup;

  constructor(private router:Router,private surveySvc : SurveyService,
    private fb:FormBuilder) { }

  async getFirms(){
    this.mainList = <Firms[]> await this.surveySvc.getFirms();
    this.firmlist = this.mainList;
  }

  async instantiateForm(){
    this.myFirm = this.fb.group({
      firmName:['']
    });
    this.myFirm.statusChanges.subscribe(()=>{
      this.firm = this.myFirm.value;
      this.firmlist = this.mainList.filter(x=>x.firmName.match(this.firm.firmName));
    });
  }

  async ngOnInit() {
    await this.instantiateForm();
    await this.getFirms();
  }

  async ngOnChanges(){
    
  }

  async refreshNav(){
    await this.ngOnInit();
  }
}

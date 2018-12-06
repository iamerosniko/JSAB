import { Component, OnInit, OnChanges,Output,EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Survey,Firms,CompanyProfiles,Years } from '../../../entities/entities'
import { SurveyService } from '../../../services/survey.service'
import { UUID } from 'angular2-uuid'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-survey-body',
  templateUrl: './survey-body.component.html',
  styleUrls: ['./survey-body.component.css']
})
export class SurveyBodyComponent implements OnInit,OnChanges{
  survey:Survey={};
  companyForm:CompanyProfiles={};
  formFromChild:FormGroup;
  certificateForm:FormGroup;
  formFromChild1:FormGroup;
  formFromChild2:FormGroup;
  formFromChild3:FormGroup;
  formFromChild4:FormGroup;
  formFromChild5:FormGroup;
  formFromChild6:FormGroup;
  formFromChild7:FormGroup;
  formFromChild8:FormGroup;
  myForm:FormGroup;
  firm:Firms={};
  isNewFirm:boolean;
  companyProfileID : string = '';
  @Output() refreshNav = new EventEmitter();
  // tempCompanyProfiles : CompanyProfiles[];
  years:Years[]=[];
  selectedYearCompanyProfileID:string="0";
  isValid:boolean=false;
  constructor( private surveySvc:SurveyService, private activatedroute: ActivatedRoute,private router :Router) {
    this.activatedroute.params.subscribe(async ()=>{
      var firmID = this.activatedroute.snapshot.params['FirmID'];
      if(firmID!=null){
        this.isNewFirm=false;
        this.getCompanyProfiles(firmID);
        this.firm.firmID=firmID
      }
      else{
        this.isNewFirm=true;
        this.firm = { firmID : UUID.UUID() };
      }
      this.companyProfileID = UUID.UUID();
    });  
  }

  ngOnChanges(){
  }

  ngOnInit(){
    var firmID = this.activatedroute.snapshot.params['FirmID'];
    if(firmID!=null){
      this.isNewFirm=false;
      this.getCompanyProfiles(firmID);
      this.firm.firmID=firmID
    }
    else{
      this.isNewFirm=true;
      this.firm = { firmID : UUID.UUID() };
    }
    this.companyProfileID = UUID.UUID();
  }

  updateCompanyProfileID(){
    this.companyProfileID = this.selectedYearCompanyProfileID=="0"? UUID.UUID() : this.selectedYearCompanyProfileID;
  }
  //for combobox of years
  async getCompanyProfiles(firmID:string){
    var companyProfiles =<CompanyProfiles[]> await this.surveySvc.getYears(firmID);
    this.years=await [];
    companyProfiles.forEach(async element => {
      this.years.push(
        {
          companyProfileID : element.companyProfileID,
          year : this.getYear(element.datecomp)
        })
    });
  }

  getYear(dateComp : any):number{
    var a =  new Date(dateComp).getFullYear();
    return a;
  }

  async save(){
    this.companyForm = this.formFromChild.value;
    this.survey.Companyprofile= this.companyForm;
    // this.firm.firmName=this.companyForm.firmname
    this.survey.FirmDemographics = this.formFromChild1.controls['regions'].value;
    this.survey.PromotionsAssociatePartners = this.formFromChild3.controls['regions'].value;
    this.survey.LeftLawyers = this.formFromChild4.controls['regions'].value;
    this.survey.JoinedLawyers = this.formFromChild5.controls['regions'].value;
    this.survey.ReducedhoursLawyers = this.formFromChild6.controls['regions'].value;
    this.survey.TopTenHighestCompensations = this.formFromChild7.controls['regions'].value;
    this.survey.UndertakenInitiatives = this.formFromChild8.value;
    this.survey.Firm = this.firm;
    this.survey.IsNewFirm=this.isNewFirm;
    this.survey.Certificates=this.certificateForm.controls['certificates'].value;
    this.survey.LeadershipDemographics = this.formFromChild2.controls['numbers'].value;
    await this.surveySvc.postSurvey(this.survey);
    await this.getCompanyProfiles(this.firm.firmID);
    // await this.refreshNav.emit();
    this.isNewFirm ? location.reload(true) : null;
  }

  checkValid():boolean{

    var a = 
      this.formFromChild.valid  && 
      this.formFromChild8.valid 

    this.isValid = !a;
    return !a;
  }

  
  getChild(event:any){
    this.formFromChild = event;
    // console.log('Company Profile')
    // console.log(this.formFromChild.value)
  }
  getCertificateForm(event:any){
    this.certificateForm = event;
    // console.log('Company Profile')
    // console.log(this.formFromChild.value)
  }
  getChild1(event:any){
    this.formFromChild1 = event;
    // console.log('Overall Firm Demographics')
    // console.log(this.formFromChild1.value)
  }
  getChild2(event:any){
    this.formFromChild2 = event;
    // console.log('Firm Leadership/Management Demographic Profile')
    // console.log(this.formFromChild2.value)
  }
  getChild3(event:any){
    this.formFromChild3 = event;
    // console.log('Number of Promotions from Associate to Partner')
    // console.log(this.formFromChild3.value)
  }
  getChild4(event:any){
    this.formFromChild4 = event;
    // console.log('Lawyers Who Left The Firm')
    // console.log(this.formFromChild4.value)
  }
  getChild5(event:any){
    this.formFromChild5 = event;
    // console.log('Hires')
    // console.log(this.formFromChild5.value)
  }
  getChild6(event:any){
    this.formFromChild6 = event;
    // console.log('Lawyers Working Reduced Hours Schedule')
    // console.log(this.formFromChild6.value)
  }
  getChild7(event:any){
    this.formFromChild7 = event;
    // console.log('Top 10% Highest Compensated Partners')
    // console.log(this.formFromChild7.value)
  }
  getChild8(event:any){
    this.formFromChild8 = event;
    // console.log('Undertaken Initiatives/Actions')
    // console.log(this.formFromChild8.value)
  }

}

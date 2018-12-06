import { Component, OnInit, Output, EventEmitter,Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { isNumber } from 'util';
import { UUID } from 'angular2-uuid';
import { LeadershipDemographics } from '../../../entities/entities';
import { SurveyService } from '../../../services/survey.service'
@Component({
  selector: 'app-firm-leadership-demographic',
  templateUrl: './firm-leadership-demographic.component.html',
  styleUrls: ['./firm-leadership-demographic.component.css']
})
export class FirmLeadershipDemographicComponent implements OnInit,OnChanges {
  @Input() companyProfileID : string ;
  @Output() updateChildFormToParent = new EventEmitter<any>();
  firmLead:string[]=['Minority Female','Minority Male','White Female','White Male','LGBT','Disabled','Total']
  firmLeadassign:string[]=['MinorityFemale','MinorityMale','WhiteFemale','WhiteMale','LGBT','Disabled','Totals']
  isExisting:boolean=false;
  leadershipDemographics:LeadershipDemographics[]=[]
  items:string[]=
  [
    'Number of attorneys who serve on the highest governance committee of the firm',
    'Number of lawyers who lead offices',
    'Number of lawyers who lead Firm-wide practice groups or departments',
    'Number of lawyers who lead local office practice groups or departments',
    'Number of lawyers who lead firm-wide committees',
    'Number of attorneys on the Partner Review Committee or the equivalent',
    'Number of lawyers who serve on the firm-wide compensation committee',
    'Number of hiring partners or equivalent'
  ]
  myForm: FormGroup;
  constructor(private surveySvc:SurveyService, private fb:FormBuilder) {
  }

  ngOnChanges(){
    this.getValue();
  }

  async getValue(){
    var ld = await this.surveySvc.getSurvey(this.companyProfileID,3);
    this.isExisting = ld ? true : false ;
    this.leadershipDemographics = ld ? ld : [];
    this.initializeForm();
  }

  initializeForm(){
    this.myForm = this.fb.group
    ({
      numbers: this.fb.array([]),
    })
    this.addRow();
    this.updateChildFormToParent.emit(this.myForm)
    this.myForm.valueChanges.subscribe(()=>{
      this.updateChildFormToParent.emit(this.myForm)
      const control = <FormArray>this.myForm.controls['numbers'];
      for(var i =0;i<control.length;i++){
        const demographics =<FormGroup> control.at(i);
        this.firmLeadassign.forEach(element => {
          if(element!='Totals'){
            if(demographics.controls[element].invalid){
              demographics.controls[element].setValue(0)
            }
          }
        });
      }
    })
  }

  ngOnInit() {
    this.initializeForm();
  }
  addRow(){
    //1.get the value of formarray that has name numbers
    // this.myForm = this.fb.group({
    //   numbers: this.fb.array([])    < -- eto un
    // })
    const control = <FormArray>this.myForm.controls['numbers'];
    //2.since walang laman ung nakuha nyang formarray.. lalagyan nya un syempre
    
    //loop items to element 
    //ung items un ung mga name sa unang column ng form na ginawa ko 
    this.items.forEach(element => {
      control.push(this.initItems(element));
    });

   
  }

  initItems(name:string): FormGroup{
    var ld = this.leadershipDemographics.find(x=>x.numberQuestion==name);
    if(ld==null){
      // return this.fb.group({
      //   'companyProfileID': [this.companyProfileID,Validators.required],
      //   leadershipDemographicID:[UUID.UUID(),Validators.required],
      //   NumberQuestion:[name],
      //   'MinorityFemale':[0,Validators.required],
      //   'MinorityMale': [0,Validators.required ],
      //   'WhiteFemale': [0, Validators.required ],
      //   'WhiteMale': [0,Validators.required ],
      //   'LGBT': [0,Validators.required],
      //   'Disabled': [0,Validators.required]
      // });

      return this.fb.group({
        'companyProfileID': [this.companyProfileID,Validators.required],
        leadershipDemographicID:[UUID.UUID(),Validators.required],
        NumberQuestion:[name],
        'MinorityFemale':[Math.floor((Math.random() * 10) + 1),Validators.required],
        'MinorityMale': [Math.floor((Math.random() * 10) + 1),Validators.required ],
        'WhiteFemale': [Math.floor((Math.random() * 10) + 1), Validators.required ],
        'WhiteMale': [Math.floor((Math.random() * 10) + 1),Validators.required ],
        'LGBT': [Math.floor((Math.random() * 10) + 1),Validators.required],
        'Disabled': [Math.floor((Math.random() * 10) + 1),Validators.required]
      });
    }
    else{
      return this.fb.group({
        'companyProfileID': [this.companyProfileID,Validators.required],
        leadershipDemographicID:[UUID.UUID(),Validators.required],
        NumberQuestion:[name],
        'MinorityFemale':[ld.minorityFemale,Validators.required],
        'MinorityMale': [ld.minorityMale,Validators.required ],
        'WhiteFemale': [ld.whiteFemale, Validators.required ],
        'WhiteMale': [ld.whiteMale,Validators.required ],
        'LGBT': [ld.LGBT,Validators.required],
        'Disabled': [ld.disabled,Validators.required]
      });
    }
    // Here, we make the form for each day
    
  }

  compute(index : number){
    const control = <FormArray>this.myForm.controls['numbers'];
    const formb=<FormGroup>control.at(index)
    var value:number=0;
   
      this.firmLeadassign.forEach(element => {
        if(element!='Totals'){
          var a =+formb.controls[element].value
       
          value=value + ((a==null)||!isNumber(a)?0:a)
        }
      });
    return value;
  }

  // submit(){
  //   this.myForm.value)
  //   const control = <FormArray>this.myForm.controls['numbers'];
  //   for(var i =0;i<control.length;i++){
  //     const demographics =<FormGroup> control.at(i);

  //     this.firmLead.forEach(element => {
  //       if(element!='Totals')
  //       element +' ' +demographics.controls[element].value)
  //     });
  //   }
  // }
}

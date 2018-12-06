import { Component, OnInit, Output, EventEmitter,Input,OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { isNumber } from 'util';
import { UUID } from 'angular2-uuid';
import { SurveyService } from '../../../services/survey.service'
import { ReducedHoursLawyers } from '../../../entities/entities';

@Component({
  selector: 'app-lawyers-reduced-hours',
  templateUrl: './lawyers-reduced-hours.component.html',
  styleUrls: ['./lawyers-reduced-hours.component.css']
})
export class LawyersReducedHoursComponent implements OnInit,OnChanges  {
  @Input() companyProfileID : string;
  @Output() updateChildFormToParent = new EventEmitter<any>();
  firmDemo:string[]=['Equity Partners','Non-Equity Partners','Associates','Counsel','Other Lawyers','Total']
  firmDemoassign:string[]=['EquityPartners','NonEquityPartners','Associates','Counsel','OtherLawyers','Totals']
  isExisting:boolean=false;
  reducedHoursLawyers:ReducedHoursLawyers[]=[]
  items:string[]=
  [
    'African American/Black(not Hispanic/Latino)',
    'Hispanic/Latino',
    'Alaska Native/American Indian',
    'Asian',
    'Native Hawaiian/Other Pacific Islander',
    'Multiracial',
    'White',
    'LGBT',
    'Disabled',
    'Women',
    'Men'
  ]
  itemsdb:string[]=
  [
    'AfricanAmericanBlacknotHispanicLatino',
    'HispanicLatino',
    'AlaskaNativeAmericanIndian',
    'Asian',
    'NativeHawaiianOtherPacificIslander',
    'Multiracial',
    'White',
    'LGBT',
    'Disabled',
    'Women',
    'Men'
  ]
  myForm: FormGroup;
  constructor(private surveySvc:SurveyService, private fb:FormBuilder) {
  }

  ngOnChanges(){
    this.getValue();
  }

  async getValue(){
    var rl = await this.surveySvc.getSurvey(this.companyProfileID,7);
    this.isExisting = rl ? true : false ;
    this.reducedHoursLawyers = rl ? rl : [];
    this.initializeForm();
  }

  initializeForm(){
    this.myForm = this.fb.group
    ({
      regions: this.fb.array([]),
    })
    this.addRow();
    this.updateChildFormToParent.emit(this.myForm)

    this.myForm.valueChanges.subscribe(()=>{
      this.updateChildFormToParent.emit(this.myForm)
      const control = <FormArray>this.myForm.controls['regions'];
      for(var i =0;i<control.length;i++){
        const demographics =<FormGroup> control.at(i);

        this.firmDemoassign.forEach(element => {
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
    //1.get the value of formarray that has name regions
    // this.myForm = this.fb.group({
    //   regions: this.fb.array([])    < -- eto un
    // })
    const control = <FormArray>this.myForm.controls['regions'];

    //2.since walang laman ung nakuha nyang formarray.. lalagyan nya un syempre
    
    //loop items to element 
    //ung items un ung mga name sa unang column ng form na ginawa ko 
    this.items.forEach(element => {
      control.push(this.initItems(element));
    });

   
  }

  initItems(name:string): FormGroup{
    var lr = this.reducedHoursLawyers.find(x=>x.regionName==name);

    if(lr==null){
      // return this.fb.group({
      //   'companyProfileID': [this.companyProfileID,Validators.required],
      //   firmDemographicID:[UUID.UUID(),Validators.required],
      //   regionName:[name],
      //   'EquityPartners':[0,Validators.required],
      //   'NonEquityPartners': [0,Validators.required],
      //   'Associates': [0, Validators.required ],
      //   'Counsel': [0,Validators.required ],
      //   'OtherLawyers': [0,Validators.required],
      // });
      return this.fb.group({
        'companyProfileID': [this.companyProfileID,Validators.required],
        firmDemographicID:[UUID.UUID(),Validators.required],
        regionName:[name],
        'EquityPartners':[Math.floor((Math.random() * 10) + 1),Validators.required],
        'NonEquityPartners': [Math.floor((Math.random() * 10) + 1),Validators.required],
        'Associates': [Math.floor((Math.random() * 10) + 1), Validators.required ],
        'Counsel': [Math.floor((Math.random() * 10) + 1),Validators.required ],
        'OtherLawyers': [Math.floor((Math.random() * 10) + 1),Validators.required],
      });
    }
    else{
      return this.fb.group({
        'companyProfileID': [this.companyProfileID,Validators.required],
        firmDemographicID:[UUID.UUID(),Validators.required],
        regionName:[name],
        'EquityPartners':[lr.equityPartners,Validators.required],
        'NonEquityPartners': [lr.nonEquityPartners,Validators.required],
        'Associates': [lr.associates, Validators.required ],
        'Counsel': [lr.counsel,Validators.required ],
        'OtherLawyers': [lr.otherLawyers,Validators.required],
      });
    }
    // Here, we make the form for each day
  }

  compute(index : number){
    const control = <FormArray>this.myForm.controls['regions'];
    const formb=<FormGroup>control.at(index)
    var value:number=0;
   
      this.firmDemoassign.forEach(element => {
        if(element!='Totals'){
          var a =+formb.controls[element].value
       
          value=value + ((a==null)||!isNumber(a)?0:a)
        }
      });
    return value;
  }

  // submit(){
  //   const control = <FormArray>this.myForm.controls['regions'];
  //   for(var i =0;i<control.length;i++){
  //     const demographics =<FormGroup> control.at(i);

  //     this.firmDemo.forEach(element => {
  //       if(element!='Totals')
  //       console.log(element +' ' +demographics.controls[element].value)
  //     });
  //   }
  // }
}

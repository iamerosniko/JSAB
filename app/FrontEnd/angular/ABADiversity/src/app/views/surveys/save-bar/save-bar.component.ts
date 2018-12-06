import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SurveyBodyComponent } from '../survey-body/survey-body.component'

@Component({
  selector: 'app-save-bar',
  templateUrl: './save-bar.component.html',
  styleUrls: ['./save-bar.component.css']
})
export class SaveBarComponent implements OnInit {
  // formFromChild:FormGroup;
  // getChild(event:any){
  //   this.formFromChild = event;
  //   console.log('parent here')
  //   console.log(this.formFromChild.value)
  // }

  // CPdata:CPEntities={};
  // myForm: FormGroup;
  // @Output() saveEmitter = new EventEmitter<>();



  // @ViewChild(FirmDemographicsComponent) FDComponent;
  
  // msg1:string;
getFirms(){
}
savebtn(){
  // console.log(this.result.formFromChild1.value)
  // console.log(this.result.formFromChild2.value)
  // console.log(this.result.formFromChild3.value)
  // console.log(this.result.formFromChild4.value)
  // console.log(this.result.formFromChild5.value)
  // console.log(this.result.formFromChild6.value)
  // console.log(this.result.formFromChild7.value)
  // console.log(this.result.formFromChild8.value)
}
  constructor(private result:SurveyBodyComponent) {
   }

  ngOnInit() {
    
  }

}

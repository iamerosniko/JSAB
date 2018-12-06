import { Component, OnInit,OnChanges, Input } from '@angular/core';
import { RaceVSRoles } from '../../../entities/racevsroles';
import { Years } from '../../../entities/entities';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent implements OnInit,OnChanges {
  @Input() selectedSurveyYear:RaceVSRoles;
  @Input() reportTypeRaceVsRole:string[];
  @Input() lineChartLabels:Array<any>;
  @Input() lineChartOptions:any;
  @Input() lineChartData:Array<any>=[];
  @Input() lineGraphData:Array<any>=[];
  @Input() lineChartLegend:boolean;
  @Input() lineChartType:string;
  @Input() lineChartTypeRate:string;
  @Input() lineChartTriggerTrial:boolean=false;
  @Input() lineChartTriggerRate:boolean=false;
  @Input() pdfExportDisplayTrigger:boolean;
  @Input() pdfRateExportDisplayTrigger:boolean;
  @Input() selectedSurveyYearGraph:RaceVSRoles;
  @Input() i:any;
  @Input() years:Years[]=[];
  @Input() selectedBaseSurveyYear:string=null;
  @Input() selectedTopSurveyYear:string=null;
  @Input() baseSurveyYear:number;
  @Input() topSurveyYear:number;

  index:number;
  
  constructor() { }

  async ngOnChanges(){
    // console.log("New stuff")
    // console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
    // console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
    // console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
    // console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)
    // console.log("i -----------------------------    " + this.index)
    // this.updateGraph(this.index)
    console.log("ONINIT START -------------->")
    // this.ngOnInit()
  }

  async ngOnInit() {
    console.log("REPORT TABLE -------->")
    console.log(this.selectedSurveyYear); 
    // console.log(this.reportTypeRaceVsRole);
    console.log("SINGLE SURVEY YEAR FILTER Start ------ REPORT TABLE")
    console.log("lineChartData")
    console.log(this.lineChartData)
    console.log("selectedBaseSurveyYear")
    console.log(this.selectedBaseSurveyYear)
    console.log("selectedTopSurveyYear")
    console.log(this.selectedTopSurveyYear)
    if (this.selectedBaseSurveyYear == this.selectedTopSurveyYear){
      console.log("SINGLE SURVEY YEAR FILTER APPROVED ------ REPORT TABLE")
      console.log(this.selectedSurveyYear)
      this.selectedSurveyYear.myRoleValues.splice(0,1);
      console.log(this.selectedSurveyYear)
    }
    console.log("SINGLE SURVEY YEAR FILTER END ------ REPORT TABLE") 
    this.lineChartData =await  this.selectedSurveyYear.myRoleValues;
  }

  async updateGraph(i:number){
  this.index = await i;
  console.log(this.index)
  console.log("Get Years START --------------->")
  console.log(this.years)
  this.years.forEach( x => {
    if (x.companyProfileID==this.selectedBaseSurveyYear){
      this.baseSurveyYear=x.year  
    }
  });
  console.log(this.baseSurveyYear)
  console.log(this.years)
  this.years.forEach( x => {
    if (x.companyProfileID==this.selectedTopSurveyYear){
      this.topSurveyYear=x.year  
    }
  });
  console.log(this.topSurveyYear)
  console.log("Get Years END --------------->") 
  if (this.lineChartTriggerTrial==true && (this.pdfExportDisplayTrigger == false || this.pdfRateExportDisplayTrigger == false)){
    this.lineChartTriggerTrial = false;
    this.lineChartTriggerRate == false;
    console.log("1st statement DONE")
    console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
    console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
    console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
    console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)
  } else if ((this.pdfExportDisplayTrigger == false && this.pdfRateExportDisplayTrigger == false) && (this.lineChartTriggerTrial==false || this.lineChartTriggerRate==false)) {

    console.log("DISPLAY START -------------->")
    var graph=[];
    var iterate=i;
    //  var selectedRace = this.selectedSurveyYearGraph[iterate].race
    console.log("GRAPH ############################")
    //  console.log(selectedRace)
    console.log(i)
    this.selectedSurveyYearGraph[i].myRoleValues.forEach(oneRolesValues => {
     
      if(oneRolesValues.year!='Rate'){
        var datasample: Array<number>=[];

        datasample.push(+oneRolesValues.equityPartners);
        datasample.push(+oneRolesValues.nonEquityPartners);
        datasample.push(+oneRolesValues.associates);
        datasample.push(+oneRolesValues.counsel);
        datasample.push(+oneRolesValues.otherLawyers);

        var sample:any =  {data:datasample,label: oneRolesValues.year };
        // iterate+=1;
        this.lineChartTriggerTrial = true;
        console.log("SAMPLE")
        console.log(sample)
        graph=graph.concat(sample);
        console.log("GRAPH")
        console.log(graph)
      }
    });
    //  var a = this.selectedSurveyYear.pop();
    // var oneRolesValues = a.myRoleValues[0];
    //  this.lineChartType = "bar";
    this.lineChartData = [] ;
    console.log("SINGLE SURVEY YEAR FILTER Start ------")
    console.log("lineChartData")
    console.log(this.lineChartData)
    console.log("selectedBaseSurveyYear")
    console.log(this.selectedBaseSurveyYear)
    console.log("selectedTopSurveyYear")
    console.log(this.selectedTopSurveyYear)
    if (this.selectedBaseSurveyYear == this.selectedTopSurveyYear){
      console.log("SINGLE SURVEY YEAR FILTER APPROVED ------")
      graph.pop()
      console.log(graph)
    }
    console.log("SINGLE SURVEY YEAR FILTER END ------")    
    this.lineChartData =await  graph;//[graph.length];
    // this.lineChartData=graph;
    // this.lineChartData.push(sample);
    console.log(this.lineChartData)
     // this.updateGraphRate(i)
    var graphRate=[];
    // var selectedRace = this.selectedSurveyYearGraph[iterate].race
    // console.log("RACE!!!")
    // console.log(selectedRace)
    // this.selectedSurveyYearGraph.myRoleValues.forEach(i=>i.year)
    this.selectedSurveyYearGraph[i].myRoleValues.forEach(oneRolesValues => {
      if (oneRolesValues.year=='Rate'){
        var datasamplerate: Array<number>=[];
        datasamplerate.push(+oneRolesValues.equityPartners.split("%")[0]);
        datasamplerate.push(+oneRolesValues.nonEquityPartners.split("%")[0]);
        datasamplerate.push(+oneRolesValues.associates.split("%")[0]);
        datasamplerate.push(+oneRolesValues.counsel.split("%")[0]);
        datasamplerate.push(+oneRolesValues.otherLawyers.split("%")[0]);

        var samplerate:any =  {data:datasamplerate,label: oneRolesValues.year };
        // iterate+=1;
        this.lineChartTriggerRate = false;
        this.lineChartTriggerTrial = true;
        console.log("SAMPLE")
        console.log(samplerate)
        graphRate=graphRate.concat(samplerate);
        console.log("GRAPH")
        console.log(graphRate)
      }
    });

    console.log("linegraphdata")
    console.log(this.lineGraphData)
    this.lineGraphData =await graphRate; 

    console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
    console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
    console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
    console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)

    this.lineChartTriggerTrial = true;
    }
    console.log(this.lineChartTriggerTrial)
    console.log(this.lineChartData)

    console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
    console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
    console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
    console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)

  }
  async updateGraphRate(i){
    // var iterate=i;
    var graphRate=[];
    // var selectedRace = this.selectedSurveyYearGraph.race
    console.log("I is HERE -------------->")
    console.log(i)
    this.selectedSurveyYearGraph[i].myRoleValues.forEach(oneRolesValues => {
      if (oneRolesValues.year=='Rate'){
        var datasamplerate: Array<number>=[];
        datasamplerate.push(+oneRolesValues.equityPartners.split("%")[0]);
        datasamplerate.push(+oneRolesValues.nonEquityPartners.split("%")[0]);
        datasamplerate.push(+oneRolesValues.associates.split("%")[0]);
        datasamplerate.push(+oneRolesValues.counsel.split("%")[0]);
        datasamplerate.push(+oneRolesValues.otherLawyers.split("%")[0]);

        var samplerate:any =  {data:datasamplerate,label: oneRolesValues.year };
        // iterate+=1;
        this.lineChartTriggerRate = true;
        this.lineChartTriggerTrial = false;
        console.log("SAMPLE")
        console.log(samplerate)
        graphRate=graphRate.concat(samplerate);
        console.log("GRAPH")
        console.log(graphRate)
      }
    });
    
    console.log("linegraphdata")
    console.log(this.lineGraphData)
    this.lineGraphData =await graphRate; 
    // this.lineChartType = "line";
    //   [
    //   {
    //     scaleOverride : true,
    //     scaleSteps : 10,
    //     scaleStepWidth : 50,
    //     scaleStartValue : 0
    //   },
    //   graph
    // ];
    console.log(this.lineGraphData)
    // this.graphdata(i,graph)
  }
}


// async updateGraph(i){
//   this.index = i;
//   console.log(this.index)
//   if (this.lineChartTriggerTrial==true && (this.pdfExportDisplayTrigger == false || this.pdfRateExportDisplayTrigger == false)){
//     this.lineChartTriggerTrial = false;
//     this.lineChartTriggerRate == false;
//     console.log("1st statement DONE")
//     console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
//     console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
//     console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
//     console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)
//   } else if ((this.pdfExportDisplayTrigger == false && this.pdfRateExportDisplayTrigger == false) && (this.lineChartTriggerTrial==false || this.lineChartTriggerRate==false)) {

  
//    var graph=[];
//    var iterate=i;
//    var selectedRace = this.selectedSurveyYearGraph[iterate].race
//    console.log("RACE!!!")
//    console.log(selectedRace)
//    console.log(i)
//    this.selectedSurveyYearGraph[i].myRoleValues.forEach(oneRolesValues => {
     
//      if(oneRolesValues.year!='Rate'){
//        var datasample: Array<number>=[];
       
//        datasample.push(+oneRolesValues.equityPartners);
//        datasample.push(+oneRolesValues.nonEquityPartners);
//        datasample.push(+oneRolesValues.associates);
//        datasample.push(+oneRolesValues.counsel);
//        datasample.push(+oneRolesValues.otherLawyers);
       
//        var sample:any =  {data:datasample,label: oneRolesValues.year };
//        // iterate+=1;
//        this.lineChartTriggerTrial = true;
//        console.log("SAMPLE")
//        console.log(sample)
//        graph=graph.concat(sample);
//        console.log("GRAPH")
//        console.log(graph)
//      }
//    });
//    // var a = this.selectedSurveyYear.pop();
//    // var oneRolesValues = a.myRoleValues[0];
//   //  this.lineChartType = "bar";
//   this.lineChartData = [] ;
//   console.log(this.lineChartData)
//   //  if (this.selectedBaseSurveyYear == this.selectedTopSurveyYear){
//   //    graph.pop()
//   //    console.log("JOENIEL")
//   //    console.log(graph)
//   //  }
//    this.lineChartData =await  graph;//[graph.length];
//    // this.lineChartData=graph;
//    // this.lineChartData.push(sample);
//   console.log("JOENIEL")
//   console.log(this.lineChartData)
//    // this.updateGraphRate(i)
//   var graphRate=[];
//   var selectedRace = this.selectedSurveyYearGraph[iterate].race
//   console.log("RACE!!!")
//   console.log(selectedRace)
//   // this.selectedSurveyYearGraph.myRoleValues.forEach(i=>i.year)
//   this.selectedSurveyYearGraph[i].myRoleValues.forEach(oneRolesValues => {
//     if (oneRolesValues.year=='Rate'){
//       var datasamplerate: Array<number>=[];
//       datasamplerate.push(+oneRolesValues.equityPartners.split("%")[0]);
//       datasamplerate.push(+oneRolesValues.nonEquityPartners.split("%")[0]);
//       datasamplerate.push(+oneRolesValues.associates.split("%")[0]);
//       datasamplerate.push(+oneRolesValues.counsel.split("%")[0]);
//       datasamplerate.push(+oneRolesValues.otherLawyers.split("%")[0]);
      
//       var samplerate:any =  {data:datasamplerate,label: oneRolesValues.year };
//       // iterate+=1;
//       this.lineChartTriggerRate = true;
//       this.lineChartTriggerTrial = true;
//       console.log("SAMPLE")
//       console.log(samplerate)
//       graphRate=graphRate.concat(samplerate);
//       console.log("GRAPH")
//       console.log(graphRate)
//     }
//   });
  
//   console.log("linegraphdata")
//   console.log(this.lineGraphData)
//   this.lineGraphData =await graphRate; 
  
//   console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
//   console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
//   console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
//   console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)

//   this.lineChartTriggerTrial = true;
//   }
//   console.log(this.lineChartTriggerTrial)
//   console.log(this.lineChartData)
//   console.log(this.lineGraphData)

//   console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
//   console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
//   console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
//   console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)
// }

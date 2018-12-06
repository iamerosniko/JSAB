import { Component, OnInit } from '@angular/core';
import { CompanyProfiles,Firms,Years,FirmDemographics } from '../../entities/entities';
import { SurveyService } from '../../services/survey.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from '../../services/report.services';
import { RaceVSRoles } from '../../entities/racevsroles';
import { defer } from 'q';
import { RolesValues } from '../../entities/rolesvalues';
import * as jspdf from 'jspdf';
import * as haha from 'html2canvas';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  mainList:Firms[]=[];
  firmList:Firms[]=[];
  firmListName:Firms[]=[];
  firmCategory:string[]=[
    'All',
    'Overall Firm Demographics',
    'Firm Leadership/Management Demographic Profile',
    'Number of Promotions from Associate to Partner',
    'Lawyers Who Left The Firm',
    'Hires',
    'Lawyers Working Reduced Hours Schedule',
    'Top 10% Highest Compensated Partners',
    'Undertaken Initiatives/Actions'
    ]
  firmCategoryMode:number[]=[]
  reportType:string[]=[
    'Race Across the Position',
    'Position Across the Race'
  ]
  reportTypeRaceVsRole:string[]=[
    'Equity Partners',
    'Non-Equity Partners',
    'Associates',
    'Counsel',
    'Other Lawyers',
    'Total'
  ]
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
  reportGroup:string[]=[
    'General',
    'Minority'
  ];
  diversityRankPosition:string[]=[
    'Equity Partners',
    'Non-Equity Partners',
    'Associates',
    'Counsel',
    'Other Lawyers'
  ];
  selectedFirm:string="0";
  selectedFirmID:string="0";
  selectedFirmName:string="0";
  selectedFirmData:string[]=[];
  selectedCategory:string="100";
  minorityTrigger:boolean=false;
  selectedCategoryMode:number;
  selectedCategoryModeDisplay:string;
  selectedBaseSurveyYear:string=null;
  baseSurveyYear:number;
  baseSurveyYearDisplay:number;
  selectedTopSurveyYear:string=null;
  topSurveyYear:number;
  topSurveyYearDisplay:number;
  selectedBaseSurveyYearDiversity:number=null;
  selectedTopSurveyYearDiversity:number=null;
  selectedReportType:string="0";
  selectedReportTypeDisplay:string="0";
  selectedReportGroup:string="0";
  selectedReportGroupDiversity:number;
  selectedReportGroupDisplay:string="0";
  selectedDiversityRankPosition:string="All";
  selectedDiversityRankPositionIndex:number;
  selectedDiversityRankPositionDisplay:string
  years:Years[]=[];
  // rate:string[]=[""];
  categoryDisplayTrigger:boolean=false;
  pdfExportDisplayTrigger:boolean=false;
  pdfRateExportDisplayTrigger:boolean=false;
  index:number;

  //report button trigger


  //diversity ranking button trigger
  firmValidation:boolean=false;
  positionValidation:boolean=false;
  groupValidation:boolean=false;
  baseYearValidation:boolean=false;
  topYearValidation:boolean=false;

  generateButtonTrigger:boolean=false;

  yearsAvailable:string;
  diversityComponentDisplay:boolean=false;
  firmsMatch:Firms[];
  diversityRankData:any;

  selectedSurveyYear:RaceVSRoles[]=[];
  selectedSurveyYearGraph:RaceVSRoles[];
  // baseSurveyYearTest:string[]=["2017"];
  surveyPreData:RolesValues[][];
  surveyData:RaceVSRoles[];
  surveyDataAssoc:Years[]

  surveyTitleList:string[];
  surveyYearPreList:string[][];
  surveyYearList:string[];
  
  pdfImages:any[];

  myForm: FormGroup;
  firmDemographics:FirmDemographics[]=[];
  firmDemoassign:string[]=['EquityPartners','NonEquityPartners','Associates','Counsel','OtherLawyers','Totals'];
  lineChartLabels:Array<any> = ['Equity Partners','Non-Equity Partners','Associates','Counsel','Other Lawyers'];// ahhh i template?
  lineChartOptions:any = {
    responsive: true,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  };
  lineChartTrigger:string="";
  lineChartTriggerTrial:any;
  lineChartTriggerRate:any;
  lineChartData:Array<any> = [];
  lineGraphData:Array<any> = [];
  lineChartLegend:boolean = true;
  lineChartType:string = 'bar';
  lineChartTypeRate:string = 'line';


  async getFirms(){
    this.mainList = <Firms[]> await this.surveySvc.getFirms();
    this.firmList = this.mainList;
    this.firmListName = this.mainList;
    console.log(this.firmListName)
  }
  async getFirmName(){

  }
  updateReportType(){
    // console.log(this.selectedReportType)
    // if (this.selectedReportType=="Race Across the Position"){
    //   this.router.navigate(['./', {outlets: {'reportroute': ['RaceAcrossthePosition']}}])
    // }
    // if (this.selectedReportType=="Position Across the Race"){
    //   this.router.navigate(['./', {outlets: {'reportroute': ['PositionAcrosstheRace']}}])
    // }
    // console.log(this.selectedReportType)
  }
  updateReportGroup(){
    console.log(this.selectedReportGroup)
    if (this.selectedReportGroup=="Normal"){
      // this.router.navigate(['./', {outlets: {'reportroute': ['RaceAcrossthePosition']}}])
    }
    if (this.selectedReportGroup=="Minority"){
      // this.router.navigate(['./', {outlets: {'reportroute': ['PositionAcrosstheRace']}}])
    }
    console.log(this.selectedReportGroup)
  }
  updateCategoryMode(){
    console.log(this.selectedCategory)
    // if (this.selectedCategory == "Overall Firm Demographics"){
    //   this.selectedCategoryMode = 2
    // } else if (this.selectedCategory == "Firm Leadership/Management Demographic Profile"){
    //   this.selectedCategoryMode = 3
    // } else if (this.selectedCategory == "Number of Promotions from Associate to Partner"){
    //   this.selectedCategoryMode = 4
    // } else if (this.selectedCategory == "Lawyers Who Left The Firm"){
    //   this.selectedCategoryMode = 5
    // } else if (this.selectedCategory == "Hires"){
    //   this.selectedCategoryMode = 6
    // } else if (this.selectedCategory == "Lawyers Working Reduced Hours Schedule"){
    //   this.selectedCategoryMode = 7
    // } else if (this.selectedCategory == "Top 10% Highest Compensated Partners"){
    //   this.selectedCategoryMode = 8
    // } else if (this.selectedCategory == "Undertaken Initiatives/Actions"){
    //   this.selectedCategoryMode = 9
    // }
    // console.log(this.selectedCategoryMode)
  }
  async updateSelectedFirm(){
    // console.log("meme")
    // this.selectedFirmID = this.selectedFirm  
    // console.log(this.selectedFirm)
    // console.log(this.selectedFirmID)
    // console.log(this.selectedCategoryMode)
    // this.selectedFirmData = await this.surveySvc.getSurveys(this.selectedFirmID);
    // console.log(this.selectedFirmData)
    // console.log("uyou")
    // this.updateSelectedBaseSurveyYear(this.selectedFirmID)
    
    if (this.selectedFirm=="1"){
      console.log("---------- Get Years Available START ----------")
      this.yearsAvailable = await this.reportService.getCompanyProfileYears()
      console.log("---------- Years Available ----------")
      console.log(this.yearsAvailable)
      console.log("---------- Get Years Available END ----------")
    } else if (this.selectedFirm!="1"){
      console.log("---------- Get Firm Data START ----------")
      this.selectedFirmID = this.selectedFirm  
      this.selectedFirmData = await this.surveySvc.getSurveys(this.selectedFirmID);
      console.log("---------- Firm Survey ----------")
      console.log(this.selectedFirmData)
      console.log("---------- Firm Years ----------")
      this.updateSelectedBaseSurveyYear(this.selectedFirmID)
      console.log("---------- Get Firm Data END ----------")
    }
  }
  // async updateSelectedFirmName(i){
  //   console.log("JOENIEL " + i)
  //   this.selectedFirmName = i
  //   console.log("AMBROCIO " + this.selectedFirmName)
  // }
  async updateSelectedBaseSurveyYear(firmID:string){
    var companyProfiles =<CompanyProfiles[]> await this.surveySvc.getYears(firmID);
    this.years=await [];
    companyProfiles.forEach(async element => {
      this.years.push(
        {
          companyProfileID : element.companyProfileID,
          year : this.getYear(element.datecomp)
          // push to different array
        })
    });
    console.log(this.years)
  }
  getYear(dateComp : any):number{
    var a =  new Date(dateComp).getFullYear();
    return a;
  }
  async updateBaseSurveyYear(){
    console.log(this.years)
    this.years.forEach( x => {
      if (x.companyProfileID==this.selectedBaseSurveyYear){
        this.baseSurveyYear=x.year  
      }
    });
    console.log(this.baseSurveyYear)
  }
  async updateTopSurveyYear(){
    console.log(this.years)
    this.years.forEach( x => {
      if (x.companyProfileID==this.selectedTopSurveyYear){
        this.topSurveyYear=x.year  
      }
    });
    console.log(this.topSurveyYear)
  }
  async genReport(i){
    console.log("genReport")
    console.log("Firm ID")
    console.log(this.selectedFirmID)
    console.log("Category Mode")
    console.log(this.selectedCategoryMode+ "" + this.selectedCategory)
    console.log("Report Type")
    console.log(this.selectedReportType)
    console.log("Base Survey Year")
    console.log(this.selectedBaseSurveyYear)
    console.log("Top Survey Year")
    console.log(this.selectedTopSurveyYear)
    console.log("i and index")
    console.log(i + "<---- i and index ---> " + this.index)

    await this.firmListName.forEach(element => { 
      if(this.selectedFirm == element.firmID){
        this.selectedFirmName = element.firmName
      }
      
    });
    
    if (this.selectedCategory == "Overall Firm Demographics"){
      this.selectedCategoryMode = 2
    } else if (this.selectedCategory == "Firm Leadership/Management Demographic Profile"){
      this.selectedCategoryMode = 3
    } else if (this.selectedCategory == "Number of Promotions from Associate to Partner"){
      this.selectedCategoryMode = 4
    } else if (this.selectedCategory == "Lawyers Who Left The Firm"){
      this.selectedCategoryMode = 5
    } else if (this.selectedCategory == "Hires"){
      this.selectedCategoryMode = 6
    } else if (this.selectedCategory == "Lawyers Working Reduced Hours Schedule"){
      this.selectedCategoryMode = 7
    } else if (this.selectedCategory == "Top 10% Highest Compensated Partners"){
      this.selectedCategoryMode = 8
    } else if (this.selectedCategory == "Undertaken Initiatives/Actions"){
      this.selectedCategoryMode = 9
    }
    this.selectedCategoryModeDisplay =this.selectedCategory
    this.selectedReportTypeDisplay =this.selectedReportType
    this.selectedReportGroupDisplay = this.selectedReportGroup
    this.baseSurveyYearDisplay = this.baseSurveyYear
    this.topSurveyYearDisplay = this.topSurveyYear

    if (this.selectedFirm=="1"){
    this.diversityComponentDisplay = true
    } else {
      this.diversityComponentDisplay = false
    }

    console.log("---------- Update selected Position START ----------")
    if (this.selectedDiversityRankPosition=="All"){
      this.selectedDiversityRankPositionIndex=0;
    }else if (this.selectedDiversityRankPosition=="Equity Partners"){
      this.selectedDiversityRankPositionIndex=1;
    }else if (this.selectedDiversityRankPosition=="Non-Equity Partners"){
      this.selectedDiversityRankPositionIndex=2;
    }else if (this.selectedDiversityRankPosition=="Associates"){
      this.selectedDiversityRankPositionIndex=3;
    }else if (this.selectedDiversityRankPosition=="Counsel"){
      this.selectedDiversityRankPositionIndex=4;
    }else if (this.selectedDiversityRankPosition=="Other Lawyers"){
      this.selectedDiversityRankPositionIndex=5;
    }
    console.log(this.selectedDiversityRankPosition)
    console.log(this.selectedDiversityRankPositionIndex)
    console.log("---------- Update selected Position END ----------")
    if (this.selectedReportGroup=="General"){
      this.selectedReportGroupDiversity=1
    } else if (this.selectedReportGroup=="Minority") {
      this.selectedReportGroupDiversity=2
    }    

    if (this.diversityComponentDisplay==true){
      this.categoryDisplayTrigger=false
      console.log("---------- Get Firms Match START ----------")
      this.firmsMatch = await null;
      this.firmsMatch = await this.reportService.getFirmsAvailable(
        this.selectedBaseSurveyYearDiversity,
        this.selectedTopSurveyYearDiversity
      )
      console.log("---------- Firms Match ----------")
      console.log(this.firmsMatch)
      console.log("---------- Get Firms Match END ----------")
  
      console.log("---------- Get Diversity Rank START ----------")
      this.diversityRankData = await null;
      console.log(this.diversityRankData)
      this.diversityRankData = await this.reportService.getDiversityRanking(
        this.firmsMatch,
        this.selectedReportGroupDiversity,
        this.selectedDiversityRankPositionIndex,
        this.selectedBaseSurveyYearDiversity,
        this.selectedTopSurveyYearDiversity
      )
      console.log(this.diversityRankData)
      console.log("---------- Position ----------")
      console.log(this.selectedDiversityRankPositionIndex)
      console.log("---------- Get Diversity Rank END ----------")
    } else if (this.diversityComponentDisplay==false){
      this.categoryDisplayTrigger=true
      if (this.selectedReportGroup=="General"){
        console.log("General Service START --------------->")
        this.selectedSurveyYear = await this.reportService.getRaceVsRoles(
          this.selectedFirmID,
          this.selectedCategoryMode,
          this.selectedBaseSurveyYear,
          this.selectedTopSurveyYear
        )
        this.selectedSurveyYearGraph = await this.reportService.getRaceVsRoles(
          this.selectedFirmID,
          this.selectedCategoryMode,
          this.selectedBaseSurveyYear,
          this.selectedTopSurveyYear
        )
        console.log("<--------------- General Service END")
      } else if (this.selectedReportGroup=="Minority") {
        console.log("Minority Service START --------------->")
        this.selectedSurveyYear = await this.reportService.getMinorities(
          this.selectedFirmID,
          this.selectedCategoryMode,
          this.selectedBaseSurveyYear,
          this.selectedTopSurveyYear
        )
        this.selectedSurveyYearGraph = await this.reportService.getMinorities(
          this.selectedFirmID,
          this.selectedCategoryMode,
          this.selectedBaseSurveyYear,
          this.selectedTopSurveyYear
        )
        console.log("<--------------- Minority Service END")
      }
      var ar = ["Women","Disabled","Men","LGBT"]

      await ar.forEach(element => {
        this.selectedSurveyYear = this.selectedSurveyYear.filter(x=>x.race!=element);
        this.selectedSurveyYearGraph = this.selectedSurveyYearGraph.filter(x=>x.race!=element);
      });
  
      // this.selectedSurveyYear = this.selectedSurveyYear.filter(x=>x.race!=("Women"||"Disabled"||"Men"||"LGBT"));
      // this.selectedSurveyYearGraph = this.selectedSurveyYearGraph.filter(x=>x.race!=("Women"||"Disabled"||"Men"||"LGBT"));
  
  
      console.log(this.selectedSurveyYear);
      this.surveyData = this.selectedSurveyYearGraph
      
      this.lineChartTriggerTrial = false;
      this.lineChartTriggerRate = false;
      
      this.lineChartTrigger = "yes"
      console.log(this.surveyData)
      console.log("SINGLE SURVEY YEAR FILTER START ---------- >")
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
      console.log("SINGLE SURVEY YEAR FILTER End < ----------")
    }
  }
 
  constructor(private surveySvc : SurveyService,
     private reportService : ReportService,
     private fb:FormBuilder, private router:Router) { }

  async ngOnInit() {
    await this.getFirms();
    // var x = document.getElementById("form_sample");
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }
    // this.initializeForm()
  }
// lineChart


async updateGraph(i){
  if (this.lineChartTriggerTrial==i && (this.pdfExportDisplayTrigger == false || this.pdfRateExportDisplayTrigger == false)){
    this.lineChartTriggerTrial = "off";
    this.lineChartTriggerRate=="off";
    console.log("1st statement DONE")
    console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
    console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
    console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
    console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)
  } else if ((this.pdfExportDisplayTrigger == false && this.pdfRateExportDisplayTrigger == false) && (this.lineChartTriggerTrial=="off" || this.lineChartTriggerRate=="off")) {
   var graph=[];
   var iterate=i;
   this.selectedSurveyYearGraph[iterate].myRoleValues.forEach(oneRolesValues => {
     
    if(oneRolesValues.year!='Rate' && this.selectedSurveyYearGraph[iterate].race!=('White'||'LGBT'||'Disabled'||'Women'||'Men')){
      var datasample: Array<number>=[];
      
      datasample.push(+oneRolesValues.equityPartners);
      datasample.push(+oneRolesValues.nonEquityPartners);
      datasample.push(+oneRolesValues.associates);
      datasample.push(+oneRolesValues.counsel);
      datasample.push(+oneRolesValues.otherLawyers);
      
      var sample:any =  {data:datasample,label: oneRolesValues.year };
      // iterate+=1;
      this.lineChartTriggerTrial = iterate;
      console.log("SAMPLE")
      console.log(sample)
      graph=graph.concat(sample);
      console.log("GRAPH")
      console.log(graph)
      }
    });
    this.lineChartData = [] ;
    var selectedRace = this.selectedSurveyYearGraph[iterate].race
    console.log("RACE!!!")
    console.log(selectedRace)
    console.log("SINGLE SURVEY YEAR FILTER Start ------ REPORT")
    console.log("lineChartData")
    console.log(this.lineChartData)
    console.log("selectedBaseSurveyYear")
    console.log(this.selectedBaseSurveyYear)
    console.log("selectedTopSurveyYear")
    console.log(this.selectedTopSurveyYear)
    this.lineChartData =await  graph;
    if (this.selectedBaseSurveyYear == this.selectedTopSurveyYear){
      console.log("SINGLE SURVEY YEAR FILTER APPROVED ------ REPORT")
      console.log(this.lineChartData)
      this.lineChartData.pop()
      console.log(this.lineChartData)
    }
    console.log("SINGLE SURVEY YEAR FILTER END ------ REPORT")
   // var a = this.selectedSurveyYear.pop();
   // var oneRolesValues = a.myRoleValues[0];
  //  this.lineChartType = "bar";
    
     
    // this.lineChartData =await  graph;
   // this.lineChartData=graph;
   // this.lineChartData.push(sample);
    console.log("JOENIEL")
    console.log(this.lineChartData)
   // this.updateGraphRate(i)
    var graphRate=[];
    var selectedRace = this.selectedSurveyYearGraph[iterate].race
    console.log("RACE!!!")
    console.log(selectedRace)
    this.selectedSurveyYearGraph[iterate].myRoleValues.forEach(oneRolesValues => {

      if(oneRolesValues.year=='Rate'){
        var datasamplerate: Array<number>=[];
        datasamplerate.push(+oneRolesValues.equityPartners.split("%")[0]);
        datasamplerate.push(+oneRolesValues.nonEquityPartners.split("%")[0]);
        datasamplerate.push(+oneRolesValues.associates.split("%")[0]);
        datasamplerate.push(+oneRolesValues.counsel.split("%")[0]);
        datasamplerate.push(+oneRolesValues.otherLawyers.split("%")[0]);

        var samplerate:any =  {data:datasamplerate,label: oneRolesValues.year };
        // iterate+=1;
        this.lineChartTriggerRate = "off";
        this.lineChartTriggerTrial = iterate;
        console.log("SAMPLE")
        console.log(samplerate)
        graphRate=graphRate.concat(samplerate);
        console.log("GRAPH")
        console.log(graphRate)
      }
    });

  console.log("linegraphdata")
  console.log(this.lineGraphData)
  this.lineGraphData =await graphRate; }
  
  console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
  console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
  console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
  console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)
}
async updateGraphRate(i){
  var iterate=i;
  var graphRate=[];
  var selectedRace = this.selectedSurveyYearGraph[iterate].race
  console.log("RACE!!!")
  console.log(selectedRace)
  this.selectedSurveyYearGraph[iterate].myRoleValues.forEach(oneRolesValues => {
    
    if(oneRolesValues.year=='Rate'){
      var datasamplerate: Array<number>=[];
      datasamplerate.push(+oneRolesValues.equityPartners.split("%")[0]);
      datasamplerate.push(+oneRolesValues.nonEquityPartners.split("%")[0]);
      datasamplerate.push(+oneRolesValues.associates.split("%")[0]);
      datasamplerate.push(+oneRolesValues.counsel.split("%")[0]);
      datasamplerate.push(+oneRolesValues.otherLawyers.split("%")[0]);
      
      var samplerate:any =  {data:datasamplerate,label: oneRolesValues.year };
      // iterate+=1;
      this.lineChartTriggerTrial = "off";
      this.lineChartTriggerRate = iterate;
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
async addchartdata(){
  this.lineChartTrigger = "no";
  console.log(this.lineChartTrigger)
  this.lineChartData.pop();
  this.lineChartTrigger = "yes";
  console.log(this.lineChartTrigger)
}
exportXls(){
  console.log(this.selectedBaseSurveyYear)
  console.log(this.selectedTopSurveyYear)
  console.log(this.baseSurveyYear)
  console.log(this.topSurveyYear)
}
async exportPdf(){
//     $("#canvas").get(0).toBlob(function(blob) {
//      saveAs(blob, "chart_1.png");
//  });
// }

// var x = document.getElementById("form_sample");
// var createform = document.createElement('form'); // Create New Element Form
// x.appendChild(createform);
// console.log("complete")

// if(document.getElementById("exportWithGraphBtn")){
//   document.getElementById("1").value="ON";}

console.log(this.pdfExportDisplayTrigger)
var data = await document.getElementById('form_sample');  
var data_pdf_head = await document.getElementById('pdf_head');  
var data_pdf_bar = await document.getElementById('pdf_bar');  
var data_pdf_line = await document.getElementById('pdf_line');  
var data_pdf_table = await document.getElementById('pdf_table'); 
// this.pdfImages = await document.getElementById('pdf_bar');   
await haha(data).then(canvas => {   //await haha(data).then(canvas => {
  // Few necessary setting options  
  var imgWidth = 210;     
  var pageHeight = 295;    
  var imgHeight = canvas.height * imgWidth / canvas.width;  
  var heightLeft = imgHeight;  
  var pagesplit: true;
  heightLeft -= pageHeight;
  
  const contentDataURL = canvas.toDataURL('image/png')  
  let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  pt
  var position = 0;  
  pdf.addImage(contentDataURL, 'png', 0, position, imgWidth, imgHeight, pagesplit)  
  // pdf.addImage(contentDataURL, 'png', 0, position, pagesplit) 
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
   pdf.save(this.selectedFirmName +"-"+this.selectedReportType+'.pdf'); // Generated PDF 
});
console.log("Complete")
}

//pdf trial here  // angular incremental ids
//<div id="id">
//<div [id]="{{nameofid}}"
genPDF() { 
  var deferreds = [];
  var doc = new jspdf();
  for (let i = 0; i < 2; i++) {
      var deferred = defer();
      console.log("done1")
      deferreds.push(deferred.promise);
      console.log("done2")
      this.generateCanvas(i, doc, deferred);
      console.log("done3")
  }
  console.log("done")
  // $.when.apply($, deferreds).then(function () { // executes after adding all images
  //   doc.save('test.pdf');
  // });
}

generateCanvas(i, doc, deferred){

  haha(document.getElementById("div" + i), {
      
      onrendered: function (canvas) {
          console.log("done3a")
          console.log("done3a")
          var img = canvas.toDataURL();
          console.log("done3a")
          doc.addImage(img, 'PNG');
          console.log("done3a")
          doc.addPage(); 
          console.log("done3a")
          deferred.resolve();
       }
  });
}
//pdf trial here 

async compilePdfData(data){
  
}
exportWithGraph(i){
  console.log("yogo")
  if (this.pdfExportDisplayTrigger == true){
    this.pdfExportDisplayTrigger = false
  } else {
    this.pdfExportDisplayTrigger = true
    this.lineChartTriggerTrial = false
    this.lineChartTriggerRate = false
  }
  i = i
  console.log(this.pdfExportDisplayTrigger)
  console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
  console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
  console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
  console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)
}
exportWithGraphAsRate(i){
  // this.updateGraphRate()
  console.log("yogo")
  if (this.pdfRateExportDisplayTrigger == true){
    this.pdfRateExportDisplayTrigger = false
  } else {
    this.pdfRateExportDisplayTrigger = true
    this.lineChartTriggerTrial = false
    this.lineChartTriggerRate =false
  }
  i = i
  console.log(this.pdfRateExportDisplayTrigger)
  console.log("lineChartTriggerTrial - " + this.lineChartTriggerTrial)
  console.log("lineChartTriggerRate - " + this.lineChartTriggerRate)
  console.log("pdfExportDisplayTrigger - " + this.pdfExportDisplayTrigger)
  console.log("pdfRateExportDisplayTrigger - " + this.pdfRateExportDisplayTrigger)
}
async remchartdata(){
  // var ctx = document.getElementById("reportCanvas")
  // // var charta = charta(ctx, {data:"1",label:"1"})
  // this.lineChartData.push(ctx, {data:1,label:"1"})
  // console.log(ctx)
  // var beforechart=await this.lineChartData.pop();
  // console.log(beforechart)
  // this.lineChartData=await [];
  // this.lineChartData.push( beforechart)
  // this.lineChartData.forEach(element => {
  //   this.lineChartData.slice();
  // });
  
  this.lineChartTrigger = "no"
  console.log(this.lineChartTrigger)
  // this.lineChartData.pop();
  // console.log(this.lineChartData)
  // this.lineChartData.slice();
  // console.log(this.lineChartData)
  // this.lineChartData.push({data:[9,5,3,2,7],label:'joe'})
  // console.log(this.lineChartData)
  // this.lineChartTrigger = "yes"
  // console.log(this.lineChartTrigger)
  // var charta = new chart(this.lineChartData)
}
  // {data: [], label: ''}
  
  
   //{data: this.surveyData, label: this.surveyData},
   // {data: [30, 48], label: '2018'}
 


public randomize():void {
  let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  for (let i = 0; i < this.lineChartData.length; i++) {
    _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    for (let j = 0; j < this.lineChartData[i].data.length; j++) {
      _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    }
  }
  this.lineChartData = _lineChartData;
}

public lineChartColors:Array<any> = [
  { // blue kopong
    backgroundColor: 'rgba(108, 146, 159, 0.4)',
    borderColor: 'rgba(108, 146, 159, 1)',
    pointBackgroundColor: 'rgba(108, 146, 159, 1)',
    pointBorderColor: '108, 146, 159, 1',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
  // ,
  // { // blue kopong
  //   backgroundColor: 'rgba(2, 40, 53, 0.4)',
  //   borderColor: 'rgba(148,159,177,1)',
  //   pointBackgroundColor: 'rgba(148,159,177,1)',
  //   pointBorderColor: '#fff',
  //   pointHoverBackgroundColor: '#fff',
  //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  // },{ // blue kopong
  //   backgroundColor: 'rgba(108, 146, 159, 0.4)',
  //   borderColor: 'rgba(148,159,177,1)',
  //   pointBackgroundColor: 'rgba(148,159,177,1)',
  //   pointBorderColor: '#fff',
  //   pointHoverBackgroundColor: '#fff',
  //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  // },
  // { // blue kopong
  //   backgroundColor: 'rgba(2, 40, 53, 0.4)',
  //   borderColor: 'rgba(148,159,177,1)',
  //   pointBackgroundColor: 'rgba(148,159,177,1)',
  //   pointBorderColor: '#fff',
  //   pointHoverBackgroundColor: '#fff',
  //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  // },{ // blue kopong
  //   backgroundColor: 'rgba(108, 146, 159, 0.4)',
  //   borderColor: 'rgba(148,159,177,1)',
  //   pointBackgroundColor: 'rgba(148,159,177,1)',
  //   pointBorderColor: '#fff',
  //   pointHoverBackgroundColor: '#fff',
  //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  // },
  // { // blue kopong
  //   backgroundColor: 'rgba(2, 40, 53, 0.4)',
  //   borderColor: 'rgba(148,159,177,1)',
  //   pointBackgroundColor: 'rgba(148,159,177,1)',
  //   pointBorderColor: '#fff',
  //   pointHoverBackgroundColor: '#fff',
  //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  // }
  // ,
  // { // grey
  //   backgroundColor: 'rgba(148,159,177,0.2)',
  //   borderColor: 'rgba(148,159,177,1)',
  //   pointBackgroundColor: 'rgba(148,159,177,1)',
  //   pointBorderColor: '#fff',
  //   pointHoverBackgroundColor: '#fff',
  //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  // },
  // { // dark grey
  //   backgroundColor: 'rgba(77,83,96,0.2)',
  //   borderColor: 'rgba(77,83,96,1)',
  //   pointBackgroundColor: 'rgba(77,83,96,1)',
  //   pointBorderColor: '#fff',
  //   pointHoverBackgroundColor: '#fff',
  //   pointHoverBorderColor: 'rgba(77,83,96,1)'
  // },
  // { // grey
  //   backgroundColor: 'rgba(148,159,177,0.2)',
  //   borderColor: 'rgba(148,159,177,1)',
  //   pointBackgroundColor: 'rgba(148,159,177,1)',
  //   pointBorderColor: '#fff',
  //   pointHoverBackgroundColor: '#fff',
  //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  // }
];
// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}
}


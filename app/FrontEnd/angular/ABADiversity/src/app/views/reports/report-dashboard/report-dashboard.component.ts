import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from '../../../services/report.services';
import { Firms,DiversityRank } from '../../../entities/entities';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent implements OnInit {
  diversityRank:number[];
  diversityRankPosition:string[]=['Equity Partners','Non-Equity Partners','Associates','Counsel','Other Lawyers','Rate'];
  diversityRankPositionLabel:string[];
  // selectedDiversityRankPositionArray:string;
  @Input() diversityRankData:any;
  diversityRankDataGraph:DiversityRank[];
  yearsAvailable:string[];
  firmsMatch:Firms[];
  @Input() selectedDiversityRankPosition:string="0";
  @Input() selectedDiversityRankPositionIndex:number=0;

  @Input() lineChartOptions:any;
  @Input() lineChartLabels:Array<any>;
  @Input() lineChartLegend:boolean = true;
  @Input() lineChartTypeRate:string = 'line';
  @Input() lineChartData:Array<any> = [];
  diversityGraphTrigger:boolean=false;
  // @Input() selectedReportGroup:number;
  // @Input() selectedBaseSurveyYearDiversity:number;
  // @Input() selectedTopSurveyYearDiversity:number;
  // @Input() firmList:Firms[];

  updateSelectedDiversityRankPosition(){
  }
  async updateDiversityRankTable(){    
    // console.log("---------- Update selected Position START ----------")
    // if (this.selectedDiversityRankPosition=="0"){
    //   this.selectedDiversityRankPositionIndex=0;
    //   this.selectedDiversityRankPositionArray="total"
    // }else if (this.selectedDiversityRankPosition=="Equity Partners"){
    //   this.selectedDiversityRankPositionIndex=1;
    //   this.selectedDiversityRankPositionArray="equityPartners"
    // }else if (this.selectedDiversityRankPosition=="Non-Equity Partners"){
    //   this.selectedDiversityRankPositionIndex=2;
    //   this.selectedDiversityRankPositionArray="nonEquityPartners"
    // }else if (this.selectedDiversityRankPosition=="Associates"){
    //   this.selectedDiversityRankPositionIndex=3;
    //   this.selectedDiversityRankPositionArray="associates"
    // }else if (this.selectedDiversityRankPosition=="Counsel"){
    //   this.selectedDiversityRankPositionIndex=4;
    //   this.selectedDiversityRankPositionArray="counsel"
    // }else if (this.selectedDiversityRankPosition=="Other Lawyers"){
    //   this.selectedDiversityRankPositionIndex=5;
    //   this.selectedDiversityRankPositionArray="otherLawyers"
    // }
    // console.log(this.selectedDiversityRankPosition)
    // console.log(this.selectedDiversityRankPositionIndex)
    // console.log("---------- Update selected Position END ----------")

    // console.log("---------- Get Firms Match START ----------")
    // this.firmsMatch = await null;
    // this.firmsMatch = await this.reportService.getFirmsAvailable(
    //   this.selectedBaseSurveyYearDiversity,
    //   this.selectedTopSurveyYearDiversity
    // )
    // console.log("---------- Firms Match ----------")
    // console.log(this.firmsMatch)
    // console.log("---------- Get Firms Match END ----------")

    // console.log("---------- Get Diversity Rank START ----------")
    // this.diversityRankData = await null;
    // console.log(this.diversityRankData)
    // this.diversityRankData = await this.reportService.getDiversityRanking(
    //   this.firmsMatch,
    //   this.selectedReportGroup,
    //   this.selectedDiversityRankPositionIndex,
    //   this.selectedBaseSurveyYearDiversity,
    //   this.selectedTopSurveyYearDiversity
    // )
    // console.log(this.diversityRankData)
    // console.log("---------- Position ----------")
    // console.log(this.selectedDiversityRankPositionIndex)
    // console.log("---------- Get Diversity Rank END ----------")
  }
  constructor(private reportService:ReportService) { }

  async ngOnInit() {
  }
  diversityGraph(){
    if (this.diversityGraphTrigger==false){
      console.log("---------- Diversity Chart Data START ----------")
      // this.diversityRankData
      this.diversityRankDataGraph = this.diversityRankData
      console.log(this.diversityRank)
      console.log(this.diversityRankDataGraph)
      var graph=[];
      var labels=[];
      this.diversityRankDataGraph.forEach(element => {
        var datasample:Array<number>=[]
        if (this.selectedDiversityRankPositionIndex == 0){
          datasample.push(+element.total)
          // datasample.push(+element.total)
        } else if (this.selectedDiversityRankPositionIndex == 1){
          datasample.push(+element.equityPartners);
        } else if (this.selectedDiversityRankPositionIndex == 2){
          datasample.push(+element.nonEquityPartners);
        } else if (this.selectedDiversityRankPositionIndex == 3){
          datasample.push(+element.associates)
        } else if (this.selectedDiversityRankPositionIndex == 4){
          datasample.push(+element.counsel)
        } else if (this.selectedDiversityRankPositionIndex == 5){
          datasample.push(+element.otherLawyers)
        }
        var datasamplelabels:Array<string>=[]
        datasamplelabels.push(element.firmName)
        var sample:any = {data:datasample,label:element.firmName}
        labels=labels.concat(datasamplelabels);
        graph=graph.concat(sample);
        });
      this.lineChartData=graph

      if (this.selectedDiversityRankPositionIndex == 0){
        this.diversityRankPositionLabel=["Rate"]
      } else if (this.selectedDiversityRankPositionIndex == 1){
        this.diversityRankPositionLabel=["Equity Partners"]
      } else if (this.selectedDiversityRankPositionIndex == 2){
        this.diversityRankPositionLabel=["Non-Equity Partners"]
      } else if (this.selectedDiversityRankPositionIndex == 3){
        this.diversityRankPositionLabel=["Associates"]
      } else if (this.selectedDiversityRankPositionIndex == 4){
        this.diversityRankPositionLabel=["Counsel"]
      } else if (this.selectedDiversityRankPositionIndex == 5){
        this.diversityRankPositionLabel=["Other Lawyers"]
      }
      this.lineChartLabels = this.diversityRankPositionLabel
      console.log(this.lineChartLabels)
      console.log(this.lineChartData)
      this.diversityGraphTrigger=true;
      this.lineChartOptions = {
        responsive: true,
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        }

      };
      this.lineChartTypeRate = 'bar'
      console.log("---------- Diversity Chart Data END ----------")
    } else if (this.diversityGraphTrigger==true) {
      this.diversityGraphTrigger=false
    }
  }
}

import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { RaceVSRoles } from "../../../entities/racevsroles";

@Component({
  selector: "report-tabledata",
  templateUrl: "./report-tabledata.component.html",
  styleUrls: ["./report-tabledata.component.css"]
})
export class ReportTabledataComponent implements OnInit,OnChanges {
  @Input() selectedSurveyYear: RaceVSRoles;
  @Input() reportTypeRaceVsRole: string[];
  @Input() showBarChart:boolean;
  @Input() showRateChart:boolean;
  @Input() gate : number = 0;

  showOptions:boolean = false ;
  showChart : number=0 ;
  showLabel : string = "Show Bar Chart"

  lineChartData: Array<any> = [];
  lineGraphData: Array<any> = [];
  lineChartLabels: Array<any> = [
    "Equity Partners",
    "Non-Equity Partners",
    "Associates",
    "Counsel",
    "Other Lawyers"
  ];
  lineChartOptions: any = {
    responsive: true
  };
  lineChartLegend: boolean = true;
  lineChartType: string = "bar";
  lineChartTypeRate: string = "line";

  constructor() {}

  async ngOnInit() {
    await this.updateGraph();
    await this.updateGraphRate();
  }

  async ngOnChanges(){
    console.log('change');
    if(!this.showBarChart && !this.showRateChart){
      this.showOptions=false;
    }
  }

  async updateGraph() {
    var graph = [];
    this.selectedSurveyYear.myRoleValues.forEach(oneRolesValues => {
      var datasample: Array<number> = [];

      datasample.push(+oneRolesValues.equityPartners);
      datasample.push(+oneRolesValues.nonEquityPartners);
      datasample.push(+oneRolesValues.associates);
      datasample.push(+oneRolesValues.counsel);
      datasample.push(+oneRolesValues.otherLawyers);

      var sample: any = { data: datasample, label: oneRolesValues.year };
      graph = graph.concat(sample);
    });
    this.lineChartData = await [];
    this.lineChartData = await graph;

    console.log(this.lineGraphData);
  }

  async updateGraphRate() {
    var graphRate = [];
    this.selectedSurveyYear.myRoleValues.forEach(oneRolesValues => {
      if (oneRolesValues.year == "Rate") {
        var datasamplerate: Array<number> = [];
        datasamplerate.push(+oneRolesValues.equityPartners.split("%")[0]);
        datasamplerate.push(+oneRolesValues.nonEquityPartners.split("%")[0]);
        datasamplerate.push(+oneRolesValues.associates.split("%")[0]);
        datasamplerate.push(+oneRolesValues.counsel.split("%")[0]);
        datasamplerate.push(+oneRolesValues.otherLawyers.split("%")[0]);

        var samplerate: any = {
          data: datasamplerate,
          label: oneRolesValues.year
        };
        graphRate = graphRate.concat(samplerate);
      }
    });

    this.lineGraphData = await graphRate;
  }
}

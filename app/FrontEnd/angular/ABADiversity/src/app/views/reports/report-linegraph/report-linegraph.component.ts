import { Component, OnInit,OnChanges, Input } from '@angular/core';
import { RaceVSRoles } from '../../../entities/racevsroles';
import { Years } from '../../../entities/entities';
@Component({
  selector: 'app-report-linegraph',
  templateUrl: './report-linegraph.component.html',
  styleUrls: ['./report-linegraph.component.css']
})
export class ReportLinegraphComponent implements OnInit {
  @Input() selectedSurveyYear:RaceVSRoles;
  @Input() reportTypeRaceVsRole:string[];
  @Input() lineChartLabels:Array<any>;
  @Input() lineChartOptions:any;
  @Input() lineChartData:Array<any>=[];
  @Input() lineGraphData:Array<any>=[];
  @Input() lineChartLegend:boolean;
  @Input() lineChartType:string;
  @Input() lineChartTypeRate:string;
  @Input() lineChartTriggerTrial:boolean;
  @Input() lineChartTriggerRate:boolean;
  @Input() pdfExportDisplayTrigger:boolean;
  @Input() pdfRateExportDisplayTrigger:boolean;
  @Input() selectedSurveyYearGraph:RaceVSRoles;
  @Input() i:any;
  @Input() years:Years[]=[];
  @Input() selectedBaseSurveyYear:string=null;
  @Input() selectedTopSurveyYear:string=null;
  @Input() baseSurveyYear:number;
  @Input() topSurveyYear:number;
  
  constructor() { }

  ngOnInit() {
  }

}

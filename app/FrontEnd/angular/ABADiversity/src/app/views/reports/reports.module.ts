import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { ReportService } from '../../services/report.services'
import { ReportsComponent } from './reports.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    RouterModule
  ],
  providers:[ReportService],
  declarations: [ReportsComponent, ReportTableComponent, ReportDashboardComponent]
})
export class ReportsModule { }

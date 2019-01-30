import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRategraphComponent } from './report-rategraph.component';

describe('ReportRategraphComponent', () => {
  let component: ReportRategraphComponent;
  let fixture: ComponentFixture<ReportRategraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRategraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRategraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

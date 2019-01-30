import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLinegraphComponent } from './report-linegraph.component';

describe('ReportLinegraphComponent', () => {
  let component: ReportLinegraphComponent;
  let fixture: ComponentFixture<ReportLinegraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLinegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLinegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

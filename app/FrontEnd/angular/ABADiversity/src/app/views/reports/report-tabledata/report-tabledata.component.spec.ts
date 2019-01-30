import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTabledataComponent } from './report-tabledata.component';

describe('ReportTabledataComponent', () => {
  let component: ReportTabledataComponent;
  let fixture: ComponentFixture<ReportTabledataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTabledataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTabledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

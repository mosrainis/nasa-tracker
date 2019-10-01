import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssTrackerComponent } from './iss-tracker.component';

describe('IssTrackerComponent', () => {
  let component: IssTrackerComponent;
  let fixture: ComponentFixture<IssTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

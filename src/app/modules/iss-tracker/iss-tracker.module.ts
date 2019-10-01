import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssTrackerRoutingModule } from "./iss-tracker-routing.module";
import { IssTrackerComponent } from './iss-tracker/iss-tracker.component';



@NgModule({
  declarations: [IssTrackerComponent],
  imports: [
    CommonModule,
    IssTrackerRoutingModule
  ]
})
export class IssTrackerModule { }

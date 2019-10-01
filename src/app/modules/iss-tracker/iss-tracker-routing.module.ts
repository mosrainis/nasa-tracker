import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssTrackerComponent } from './iss-tracker/iss-tracker.component';


const routes: Routes = [
  {
    path: '',
    component: IssTrackerComponent,
    data: { animation: 'isLeft'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssTrackerRoutingModule { }

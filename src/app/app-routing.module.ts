import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Main components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'isRight'}
  },
  {
    path: 'astronauts',
    loadChildren: './modules/astronauts/astronauts.module#AstronautsModule'
  },
  {
    path: 'iss-tracker',
    loadChildren: './modules/iss-tracker/iss-tracker.module#IssTrackerModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

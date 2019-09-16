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
    loadChildren: () => import(`./modules/astronauts/astronauts.module`).then(m => m.AstronautsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AstroComponent } from './components/astro/astro.component';


const routes: Routes = [
  {
    path: '',
    component: AstroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstronautsRoutingModule { }

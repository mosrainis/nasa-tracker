import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstronautsRoutingModule } from './astronauts-routing.module';
import { AstroComponent } from './components/astro/astro.component';


@NgModule({
  declarations: [AstroComponent],
  imports: [
    CommonModule,
    AstronautsRoutingModule
  ]
})
export class AstronautsModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AstronautsModule } from "./modules/astronauts/astronauts.module";
import { IssTrackerModule } from './modules/iss-tracker/iss-tracker.module';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplayoutComponent } from './Main components/applayout/applayout.component';
import { HeaderComponent } from './Main components/header/header.component';
import { MenuComponent } from './Main components/menu/menu.component';
import { HomeComponent } from './Main components/home/home.component';
import { FooterComponent } from './Main components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplayoutComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AstronautsModule,
    IssTrackerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

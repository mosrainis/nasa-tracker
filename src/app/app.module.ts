import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplayoutComponent } from './Main components/applayout/applayout.component';
import { HeaderComponent } from './Main components/header/header.component';
import { MenuComponent } from './Main components/menu/menu.component';
import { HomeComponent } from './Main components/home/home.component';
import { FooterComponent } from './Main components/footer/footer.component';
import { CountdownComponent } from './Main components/countdown/countdown.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplayoutComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    CountdownComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

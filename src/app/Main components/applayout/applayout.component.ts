import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from "../../route-animation";

@Component({
  selector: 'app-applayout',
  templateUrl: './applayout.component.html',
  styleUrls: ['./applayout.component.scss'],
  animations: [
    fader
  ]
})
export class ApplayoutComponent implements OnInit {

  desktopMenu: boolean = false

  constructor() { }

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {  
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];    
  }

}

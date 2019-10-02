import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from "../../route-animation";
import { DataDeliveryService } from 'src/app/services/data-delivery.service';

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
  modules

  constructor(
    private delivery: DataDeliveryService
  ) { }

  ngOnInit() {
    this.getData()
  }

  prepareRoute(outlet: RouterOutlet) {  
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];    
  }

  getData() {
    this.delivery.modulesList.subscribe(result => {
      this.modules = result
      console.log(this.modules);
      
    })
  }

}

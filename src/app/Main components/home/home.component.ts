import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EventEmitter } from 'events';
import { DataDeliveryService } from 'src/app/services/data-delivery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeContent: any = [
    {
      title: 'Astronauts currently in space',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      routeAddress: '/astronauts',
      pictureURL: '../../../assets/images/main-background.jpg'
    },
    {
      title: 'ISS Tracker',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor reet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      routeAddress: '/iss-tracker',
      pictureURL: '../../../assets/images/iss.jpg'
    }
  ]
  selected: boolean = false  

  constructor(
    private api: ApiService,
    private delivery: DataDeliveryService
  ) {
    this.sendData()
  }

  ngOnInit() {
    
  }

  itemSelected(item:any) {
    item.selected = !item.selected;
  }

  todaysAtro() {
    this.api.getAstronauts().subscribe(result => {
      console.log(result);
    })
  }

  sendData() {
    this.delivery.modulesList.next(this.homeContent)
  }

}

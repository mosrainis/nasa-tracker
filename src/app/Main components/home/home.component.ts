import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeContent = [
    {
      title: 'Astronauts currently in space',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      routeAddress: '/astronauts'
    }
  ]
  selected: boolean = false

  constructor(
    private api: ApiService
  ) { }

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

}

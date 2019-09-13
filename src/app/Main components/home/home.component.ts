import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list = [
    {asdf:'asd'},
    {asdf:'asd'},
    {asdf:'asd'},
    {asdf:'asd'},
    {asdf:'asd'},
    {asdf:'asd'},
    {asdf:'asd'},
    {asdf:'asd'},
    {asdf:'asd'}
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

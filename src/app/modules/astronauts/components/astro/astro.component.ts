import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-astro',
  templateUrl: './astro.component.html',
  styleUrls: ['./astro.component.scss']
})
export class AstroComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.todaysAtro()
  }

  todaysAtro() {
    this.api.getAstronauts().subscribe(result => {
      console.log(result);
    })
  }
}

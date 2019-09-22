import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Astros } from 'src/app/models/api.model';

@Component({
  selector: 'app-astro',
  templateUrl: './astro.component.html',
  styleUrls: ['./astro.component.scss']
})
export class AstroComponent implements OnInit {

  astros: Astros[] = []

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.todaysAstros()
  }

  todaysAstros() {
    this.api.getAstronauts().subscribe(result => {
      console.log(result);
      
      this.astros = result
    })
  }

  wikiInfo() {
    this.api.getWikiData().subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
      
    })
  }
}

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
  astroURL: string = ""
  displayLoadingIcon: boolean = false
    
  //This list helps the program to identify the right page of our astronaut :
  listOfAstroKeywords = [
    "astronaut ",
    "cosmonaut ",
    "NASA ",
    "U.S ",
    "US ",
    "space",
    "force ",
    "air "
  ]

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.todaysAstros()
  }

  todaysAstros() {
    this.api.getAstronauts().subscribe(result => {
      this.astros = result
      this.astros["people"].map(o => (o.displayWikiSec = false));
      console.log(this.astros);
    })
  }

  wikiInfo(astronautName, itemIndex) {
    this.astros["people"][itemIndex].displayWikiSec = true
    this.displayLoadingIcon = true

    //Change the name of astronaut to the standard URL format :
    let astroName = encodeURIComponent(astronautName.trim());

    this.api.getWikiPage(astroName).subscribe(result => {
      this.displayLoadingIcon = false
  
      //search for the list of words in the wikiResult[2] :
      for (const [index, value] of result[2].entries()) {
        if (this.listOfAstroKeywords.some( substr => { return value.indexOf(substr) >= 0; })) {
          this.astroURL = result[3][index]
          break
        }
      }
    }, error => {
      this.displayLoadingIcon = false
      console.log(error);
    })
  }

  closeWikiSec(itemIndex) {
    this.astros['people'][itemIndex].displayWikiSec = false
    this.astroURL = ""
  }
}

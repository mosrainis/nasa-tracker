import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import * as satellite from "satellite.js";
import * as d3 from 'd3-geo'
import { ApiService } from 'src/app/services/api.service';
import { ISS } from 'src/app/models/api.model';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-iss-tracker',
  templateUrl: './iss-tracker.component.html',
  styleUrls: ['./iss-tracker.component.scss']
})
export class IssTrackerComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', {static: false}) canvas: ElementRef
  @ViewChild("earth", {static: false}) naturalEarth: ElementRef
  @ViewChild("container", {static: false}) container: ElementRef

  context: CanvasRenderingContext2D
  
  canvasWidth: number
  canvasHeight: number
  ISSData: ISS[]
  groundTracks = []
  subscription: Subscription

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getISSData()
  }

  // get ISS TLEs from NASA API
  getISSData() {
    this.api.getISSTLE().subscribe(
      result => {
        this.ISSData = result
        // calculate ground tracks
        this.pointCalculator()
      },
      error => console.log(error)
    )
  }

  pointCalculator() {
    // number of points we need to draw the ground track line
    const numberOfPoints = 5500
    let currentTime = new Date()
    const refreshTime = interval(1000)
    // initilize the satellite data
    const satelliteRecord = satellite.twoline2satrec(this.ISSData["line1"], this.ISSData["line2"]);
    this.subscription = refreshTime.subscribe(value => {
      this.canvasWidth = this.naturalEarth.nativeElement.width
      this.canvasHeight = this.naturalEarth.nativeElement.height
      // calculating previous ground tracks (will executed only at startup)
      if (this.groundTracks.length === 0) {
        for (let i = 1; i <= numberOfPoints; i++) {
          currentTime = new Date(currentTime.getTime() + -1*1000)
          this.convertTLE(satelliteRecord, currentTime, true)
        }
      }
      currentTime = new Date()
      this.convertTLE(satelliteRecord, currentTime, false)
      if(this.groundTracks.length > numberOfPoints) {
        this.groundTracks.pop()
      }
      this.initProjection()
    })
  }

  // convert the set of TLEs to longitude and latitude of a specific time
  convertTLE(
    satrec,
    time: Date,
    firstSet: boolean = false
  ) {
    let positionAndVelocity = satellite.propagate(satrec, time);
    const positionEci = positionAndVelocity.position
    const velocityEci = positionAndVelocity.velocity

    console.log(velocityEci);
    

    const gmst = satellite.gstime(new Date());
    const positionGd = satellite.eciToGeodetic(positionEci, gmst)

    const longitude = positionGd.longitude,
    latitude = positionGd.latitude;
    // altitude = positionGd.height

    const longitudeStr = satellite.degreesLong(longitude),
    latitudeStr  = satellite.degreesLat(latitude);

    if (firstSet == true ) {
      this.groundTracks.push([longitudeStr, latitudeStr])
      
    } else {
      this.groundTracks.unshift([longitudeStr, latitudeStr])
    }    
      
  }

  //initilize the canvas
  initProjection() {    

    const projection = d3.geoEquirectangular()
      .fitSize([this.canvasWidth, this.canvasWidth/2], {type: 'Sphere'})
      .precision(0.1);
      
    this.context = this.canvas.nativeElement.getContext("2d");

    const path = d3.geoPath()
      .projection(projection)
      .context(this.context);      

    this.context.drawImage(this.naturalEarth.nativeElement, 0, 0,this.canvasWidth, this.canvasWidth/2)

    let line = this.groundTracks.slice()
    const lineWidth = 1.25 + (this.canvasWidth / 1200)   

    let opacity = 1.0
    let decay = opacity / line.length
    this.context.lineWidth = lineWidth

    while (line.length > 1) {
      let start = line[0]
      let end = line[1]

      this.context.strokeStyle = `rgba(255,0,0,${opacity}`

      let segment = {
        type: 'LineString',
        coordinates: [start, end]
      }

      this.context.beginPath(), path(segment), this.context.stroke()

      opacity -= decay

      line.shift()
    
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}

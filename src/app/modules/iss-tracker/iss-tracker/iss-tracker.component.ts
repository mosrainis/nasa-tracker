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

  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild("earth", {static: false}) naturalEarth: ElementRef

  context: CanvasRenderingContext2D
  
  canvasWidth: number = 1000
  ISSData: ISS[]
  groundTracks = []
  subscription: Subscription

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getISSData()

    // setTimeout(() => {
      
    // }, 1000);
  }

  getISSData() {
    this.api.getISSTLE().subscribe(
      result => {
        this.ISSData = result
        this.pointCalculator()
      },
    )
  }

  pointCalculator() {
    const numPoints = 100
    const timeBetweenPoints = interval(200)
    const satelliteRecord = satellite.twoline2satrec(this.ISSData["line1"], this.ISSData["line2"]);
    this.subscription = timeBetweenPoints.subscribe(value => {
      this.convertTLE(satelliteRecord)
      if(this.groundTracks.length > numPoints) {
        this.groundTracks.pop()
      }
      this.initProjection()
    })
  }

  convertTLE(satrec) {
      
    const positionAndVelocity = satellite.propagate(satrec, new Date());

    const positionEci = positionAndVelocity.position
    const gmst = satellite.gstime(new Date());
    const positionGd = satellite.eciToGeodetic(positionEci, gmst)

    const longitude = positionGd.longitude,
    latitude = positionGd.latitude;
    // altitude = positionGd.height

    const longitudeStr = satellite.degreesLong(longitude),
    latitudeStr  = satellite.degreesLat(latitude);

    this.groundTracks.unshift([longitudeStr, latitudeStr])
      
  }

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
    const lineWidth = (this.canvasWidth / 100)    

    if (d3.geoDistance(line[0], line[line.length - 1]) < 0.005) {
      this.context.strokeStyle = 'rgb(255,0,0)'
      // this.context.lineWidth = 2 * lineWidth

      this.context.beginPath()
      path(d3.geoCircle().center(line[0]).radius(0.05)())
      this.context.stroke()
    } else {
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}

import { Component, OnInit } from '@angular/core';
import * as satellite from "node_modules/satellite.js";
import { ApiService } from 'src/app/services/api.service';
import { ISS } from 'src/app/models/api.model';

@Component({
  selector: 'app-iss-tracker',
  templateUrl: './iss-tracker.component.html',
  styleUrls: ['./iss-tracker.component.scss']
})
export class IssTrackerComponent implements OnInit {

  ISSData: ISS[] = []

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.lteConvertor()
  }

  lteConvertor() {
    this.api.getISSTLE().subscribe(result => {
      console.log(result);
      this.ISSData = result

      var satrec = satellite.twoline2satrec(this.ISSData["line1"], this.ISSData["line2"]);

      var positionAndVelocity = satellite.propagate(satrec, new Date());

      var positionEci = positionAndVelocity.position

      var gmst = satellite.gstime(new Date());

      var positionGd    = satellite.eciToGeodetic(positionEci, gmst)


      var satelliteX = positionEci.x,
      satelliteY = positionEci.y,
      satelliteZ = positionEci.z

      console.log(`
      satellite X : ${satelliteX}
      satellite Y : ${satelliteY}
      satellite Z : ${satelliteZ}
      `);

      var longitude = positionGd.longitude,
      latitude = positionGd.latitude,
      altitude = positionGd.height;

      var longitudeStr = satellite.degreesLong(longitude),
      latitudeStr  = satellite.degreesLat(latitude);
    
      console.log(`
      Altitude : ${altitude}
      Latitude Degrees : ${latitudeStr}
      Longitude Degrees : ${longitudeStr}
      `);
      })
  }
}

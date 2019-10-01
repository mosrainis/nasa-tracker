import { Component, OnInit } from '@angular/core';
import * as satellite from "node_modules/satellite.js";

@Component({
  selector: 'app-iss-tracker',
  templateUrl: './iss-tracker.component.html',
  styleUrls: ['./iss-tracker.component.scss']
})
export class IssTrackerComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit() {
    this.lteConvertor()
  }

  lteConvertor() {
    var tleLine1 = '1 25544U 98067A   19268.70951713  .00000733  00000-0  20807-4 0  9993',
    tleLine2 = '2 25544  51.6423 222.7389 0007476  84.3800 337.5949 15.50108916190852';  

    var satrec = satellite.twoline2satrec(tleLine1, tleLine2);

    var positionAndVelocity = satellite.propagate(satrec, new Date());

    var positionEci = positionAndVelocity.position,
    velocityEci = positionAndVelocity.velocity;

    var valocity = Math.sqrt(Math.pow(velocityEci.x, 2) + Math.pow(velocityEci.y, 2) + Math.pow(velocityEci.z, 2))
    console.log(`
    Valocity : ${valocity}
    `);
    
    
    var observerGd = {
      longitude: satellite.degreesToRadians(-122.0308),
      latitude: satellite.degreesToRadians(36.9613422),
      height: 0.370
    };

    var gmst = satellite.gstime(new Date());

    var positionEcf   = satellite.eciToEcf(positionEci, gmst),
    observerEcf   = satellite.geodeticToEcf(observerGd),
    positionGd    = satellite.eciToGeodetic(positionEci, gmst),
    lookAngles    = satellite.ecfToLookAngles(observerGd, positionEcf)


    var satelliteX = positionEci.x,
    satelliteY = positionEci.y,
    satelliteZ = positionEci.z;

    console.log(`
    satellite X : ${satelliteX}
    satellite Y : ${satelliteY}
    satellite Z : ${satelliteZ}
    `);
    

    var azimuth   = lookAngles.azimuth,
    elevation = lookAngles.elevation,
    rangeSat  = lookAngles.rangeSat;

    console.log(`
    Azimuth : ${azimuth}
    Elevation : ${elevation}
    rangeSat : ${rangeSat}
    `);

    var longitude = positionGd.longitude,
    latitude  = positionGd.latitude,
    altitude    = positionGd.height;

    console.log(`
    Altitude : ${altitude}
    `);

    var longitudeStr = satellite.degreesLong(longitude),
    latitudeStr  = satellite.degreesLat(latitude);
  
    console.log(`
    Latitude Degrees : ${latitudeStr}
    Longitude Degrees : ${longitudeStr}
    `);
    
    console.log(satellite)
  }

}

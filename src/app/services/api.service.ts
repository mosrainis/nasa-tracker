import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ISS, Astros } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getAstronauts(): Observable<Astros[]> {
    return this.http.get<Astros[]>(`http://api.open-notify.org/astros.json`)
  }

  getWikiPage(astroName: string): Observable<any> {
    return this.http.get<any>(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${astroName}&format=json&origin=*`)
  }

  getISSTLE(): Observable<ISS[]> {
    return this.http.get<ISS[]>(`https://data.ivanstanojevic.me/api/tle/25544`)
  }
}

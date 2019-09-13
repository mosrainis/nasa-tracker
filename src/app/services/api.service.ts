import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getAstronauts(): Observable<any> {
    return this.http.get<any>(`https://api.nasa.gov/neo/rest/v1/feed/today?api_key=DEMO_KEY`)
  }
}

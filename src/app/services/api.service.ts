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
    return this.http.get<any>(`http://api.open-notify.org/astros.json`)
  }

  getWikiData(): Observable<any> {
    return this.http.get<any>(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=nepal`)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apikey = 'bd2557c10fcf819baf4924ac3905782b';
  constructor(private http: HttpClient) { }
  getweatherbycity(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={this.apikey}`;
    return this.http.get(url);
  }
}

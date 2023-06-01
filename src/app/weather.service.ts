import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apikey = 'd7fce4645c5dd76df88b79406a12f909';

  constructor(private http: HttpClient) { }

  getweatherbycity(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apikey}`;
    return this.http.get(url);
  }
}

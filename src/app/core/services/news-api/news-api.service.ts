import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewsResponse } from '../../interfaces/news-response';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  apiUrl: string = environment.apiURL;
  apiKey: string = environment.apiKey;

  routes = {
    country: '?country=',
    apiKey: '&apiKey=',
    getNewsByCountry: (country: string) => `${this.apiUrl}?country=${country}&apiKey=${this.apiKey}`,

  }

  constructor(private httpClient: HttpClient) {

  }

  getByCountry(country: string): Observable<NewsResponse> {
    return this.httpClient.get<NewsResponse>(this.routes.getNewsByCountry(country));
  }

}

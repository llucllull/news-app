import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey: string = '56d2b5a2c6b64acb9217ca4ea1562f60';
  private apiUrl: string = 'https://newsapi.org/v2/';

  constructor(private http: HttpClient) { }

  //get all news
  getAllNews(search: string): Observable<any> {
    const url = `${this.apiUrl}/everything?q=${search}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  //get live top and breaking news
  getTopHeadlinesNews(): Observable<any> {
    const url = `${this.apiUrl}/top-headlines?country=us&pageSize=10&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  //get news sources
  getNewsSources(search: string): Observable<any> {
    const url = `${this.apiUrl}/top-headlines/sources?q=${search}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getNewsByCategory(category: string | null): Observable<any> {
    const url = `${this.apiUrl}/top-headlines?category=${category}&pageSize=15&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

}

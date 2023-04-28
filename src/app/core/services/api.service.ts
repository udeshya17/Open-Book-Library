import { Inject, Injectable, } from '@angular/core';
import { HttpRequestOptions } from '../models/http-request-options.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const ROOT_URL = 'https://openlibrary.org';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
 baseUrl = 'http://openlibrary.org/search.json';
  private apiUrl = 'https://openlibrary.org/search.json';


  constructor(
    private httpClient: HttpClient
  ) { }




  searchBooks(searchQuery: string, pageSize: number, offset: number, searchType: string = 'title'): Observable<any> {
      const url = `${this.baseUrl}?q=${searchQuery}&limit=${pageSize}&offset=${offset}`;
      return this.httpClient.get<any>(url).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError('No results found');
          } else {
            return throwError('Something went wrong');
          }
        })
      );
    }



  apicall(query: string, page: number, limit: number, offset?: number) {
    const url = `${this.apiUrl}?q=${query}&page=${page}&limit=${limit}&offset=${offset}`;
    return this.httpClient.get(url);
  }



  get<T>(url: string, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    return this.httpClient.get<T>(apiPath, config);
  }

  post<T>(url: string, body: Record<string, any> = {}, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    return this.httpClient.post<T>(apiPath, body, config);
  }

  delete<T>(url: string, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    return this.httpClient.delete<T>(apiPath, config);
  }
}

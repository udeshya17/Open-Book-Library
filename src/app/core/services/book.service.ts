import { Injectable } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) { }



  searchBooks(query: string, searchType: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/search.json?${searchType}=${query}`;
    return this.http
      .get(url, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getBookDetails(id: string): Observable<Book> {
    const url = `${this.apiUrl}/works/${id}.json`;
    return this.http.get<Book>(url);
  }

  getBooksBySubject(subject: string): Observable<any> {
    const url = `${this.apiUrl}/subjects/${subject}.json`;
    return this.http.get<any>(url);
  }
}

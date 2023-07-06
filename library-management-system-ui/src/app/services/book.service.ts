import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiBaseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    const url = `${this.apiBaseUrl}/book`;
    return this.http.get(url);
  }

  getBooksById(Id:any): Observable<any> {
    const url = `${this.apiBaseUrl}/book`;
    return this.http.get(url+Id);
  }

  addBook(book: any): Observable<any> {
    const url = `${this.apiBaseUrl}/book`;
    return this.http.post(url, book);
  }

  updateBook(book:any): Observable<any>{
    const url= `${this.apiBaseUrl}/book`;
    return this.http.put(url,book);
  }
  
  deleteBook(Id:any): Observable<any>{
    const url= `${this.apiBaseUrl}/book/${Id}`;
    return this.http.delete(url);
  }

  takeBook(bookId:any): Observable<any>{
    const url= `${this.apiBaseUrl}/book/take/book/${bookId}`;
    return this.http.put(url,null);
  }
  returnBook(bookId:any): Observable<any>{
    const url= `${this.apiBaseUrl}/book/return/book/${bookId}`;
    return this.http.put(url,null);
  }
}

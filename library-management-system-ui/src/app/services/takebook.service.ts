import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TakebookService {

  private take_book_url='http://localhost:8080/api/take/book/';
  private return_book_url='http://localhost:8080/api/return/book/';
  private get_take_books='http://localhost:8080/api/takebook/';
  constructor(private http: HttpClient) { }

  takeBook(data:any): Observable<any>{
    const url= `${this.take_book_url}`;
    return this.http.put(url,data);
  }
  returnBook(data:any): Observable<any>{
    const url= `${this.return_book_url}`;
    return this.http.put(url,data);
  }
  getTakeBookByID(Id:any): Observable<any>{
    const url =`${this.get_take_books}`;
    return this.http.get(url+Id);
  }
}

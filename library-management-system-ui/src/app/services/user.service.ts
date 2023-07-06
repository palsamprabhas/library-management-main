import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private url: string = `http://localhost:8080/api/login`;
  private register_url=`http://localhost:8080/api/register`;
  private get_user_by_username_url='http://localhost:8080/api/getuser/';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.url, data);
  }

  addUser(data: any): Observable<any> {
    return this.http.post<any>(this.register_url, data);
  }

  getUserByUsername(username: any): Observable<any>{
    return this.http.get<any>(this.get_user_by_username_url+username)
  }
}

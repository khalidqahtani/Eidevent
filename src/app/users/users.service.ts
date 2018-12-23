import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const API_ARGS = {headers: headers};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  addUser(a): Observable<User> {
    console.log(JSON.stringify(a.value));
    return this.http.post<User>('/api/users/registration/ROLE_USER', JSON.stringify(a.value), API_ARGS);
  }
  addOrgnizer(a): Observable<User> {
    return this.http.post<User>('/api/users/registration/ROLE_ORGANIZER', JSON.stringify(a.value), API_ARGS);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`api/users`);
  }
  getUser(userid: number): Observable<User> {
    return this.http.get<User>(`api/users/` + `${userid}`);
  }
  updateUser(a, userid: number): Observable<User> {
    return this.http.put<User>(`api/users/update/` + `${userid}`, JSON.stringify(a.value), API_ARGS);
  }
  deleteUser(userid: number): Observable<User> {
    return this.http.delete<User>(`api/users/delete/` + `${userid}`);
  }
}

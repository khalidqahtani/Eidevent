import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {config} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.get<any>('/userData', {headers: headers})
      .pipe(map(user => {
        // login successful if there's a user in the response
        if (user) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          user.authdata = btoa(`${username}:${password}`);
          localStorage.setItem('currentUser', JSON.stringify(user));
          user = JSON.parse(localStorage.getItem('currentUser'));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.userid;
    }
  }
  getUsername() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.username;
    }
  }
  getFirstName() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.firstname;
    }
  }
  getLastName() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.lastname;
    }
  }
  getId() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.id;
    }
  }
  getEmail() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.email;
    }
  }
  getBirthday() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.birthday;
    }
  }
  getGender() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.gender;
    }
  }
  getMobile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.mobile;
    }
  }

  getRole() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser.role;
    }
  }
}
//parse تحويل
//

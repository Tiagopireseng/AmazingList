import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../login/user';

@Injectable({
  providedIn: 'any',
})
export class UserloginService {
  usersUrl = 'http://localhost:8000/api-token-auth/';

  constructor(private http: HttpClient) {}

  authenticateUser(user: User) {
    const userdata = JSON.stringify(user);
    console.log('USERDATA', userdata);
    return this.http.post<string>(this.usersUrl, user);
  }
}

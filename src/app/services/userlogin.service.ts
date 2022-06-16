import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../login/user';
import { Token } from '../login/models/token';
import { LoginModule } from '../login/login.module';

@Injectable({
  providedIn: 'root',
})
export class UserloginService {
  authUrl = 'http://localhost:8000/api-token-auth/';
  usersUrl = 'http://localhost:8000/api/users/';
  loginUrl = 'http://localhost:8000/login';

  constructor(private http: HttpClient) {}

  authenticateUser(user: User) {
    const userdata = JSON.stringify(user);
    console.log('USERDATA', userdata);
    return this.http.post<Token>(this.authUrl, user);
  }
  getUser(username: string) {
    return this.http.get<User[]>(this.usersUrl, {
      params: { username: username },
    });
  }
  loginUser(username: string, token: string) {
    return this.http.get<User>(this.usersUrl, {
      params: { username: username },
      headers: { Authorization: 'Bearer ' + token },
    });
  }
}

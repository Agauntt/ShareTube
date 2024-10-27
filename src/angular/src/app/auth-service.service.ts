import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user'
import shajs from 'sha.js';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  key:string = 'abc123';

  private user: User;
  private signup: string;
  private baseUrl: string;
  private login: string;

  constructor(private http:HttpClient) {
    this.user = this.user as User;
    this.baseUrl= 'http://127.0.0.1:5000'
    this.signup = this.baseUrl + '/signup'
    this.login = this.baseUrl + '/login'
  }

  public signUp(user:User){
    user.password = shajs('sha256').update(user.password).digest('hex')
    console.log(user.password)
    return this.http.post<User>(this.signup, user);
  }

  public logIn(username, password){
    console.log(username)
    console.log(password)
    password = shajs('sha256').update(password).digest('hex');
    console.log(password);
    let usr_payload = {
      username: username,
      password: password
    }
    return this.http.post<User>(this.login, usr_payload);
  }
}

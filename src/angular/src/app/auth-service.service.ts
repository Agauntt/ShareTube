import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private user: User;
  private signup: string;
  private baseUrl: string;
  private login: string;

  constructor(private http:HttpClient) {
    this.user = new User
    this.baseUrl= 'http://127.0.0.1:5000'
    this.signup = this.baseUrl + '/signup'
    this.login = this.baseUrl + '/login'
   }

   public signUp(user:User){
    return this.http.post<User>(this.signup, user)
   }

   public logIn(user:User){
    return this.http.post<User>(this.login, user)
   }
}

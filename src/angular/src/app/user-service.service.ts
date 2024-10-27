import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  private _id: string;
  private getUserURL: string


  constructor(private authService: AuthServiceService, private http: HttpClient) {
    this.getUserURL = "http://127.0.0.1:5000/user/"
   }

  public saveUsrID(user_id:string) {
    this._id = user_id
    localStorage.setItem('user_id', user_id)
  }

  public fetchUsrID() {
    console.log("In fetchbyId function")
    if (this._id == null){
      console.log("no ID found, checking session")
      try {
        this._id = localStorage.getItem('user_id')
      } catch {
        console.log("User not logged in or cached...")
        return this._id = '1'
      } finally {
        console.log(this._id)
      }
    }
    return this._id
  }

  public fetchUsrByID(user_id:string) {
    console.log("fetching user by ID")
    console.log(this.getUserURL+user_id)
    return this.http.get("http://127.0.0.1:5000/getuser/"+user_id)
  }

  public parseUser(data) {
    let user: User = {
      _id: data._id ?? '1',
      first_name: data.first_name ?? 'Default',
      last_name: data.last_name ?? 'User',
      username: data.username ?? 'Basic_Joe',
      password: '',
      is_active: data.is_active ?? false,
      is_admin: data.is_admin ?? false,
      pfp_id: data.pfp_id ?? '',
       }
    return user
  }

  public userObj() {
    let data:User = {
    _id: '1',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    is_active: true,
    is_admin: false,
    pfp_id: ''
  }
    return data

}


}
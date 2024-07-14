import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  private user: User;
  private _id: string;

  constructor() {
    this.user = new User
   }

  public saveUsrID(user_id:string) {
    this._id = user_id
  }

  public fetchUsrID() {
    return this._id
  }
}

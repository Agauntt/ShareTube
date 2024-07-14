import { Component } from '@angular/core';
import { User } from '../models/user'
import { AuthServiceService } from '../auth-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  user: User 

  constructor(private authService: AuthServiceService, private userService: UserServiceService) {
    this. user = new User;
    this.user._id = userService.fetchUsrID();
  }

}

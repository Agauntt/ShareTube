import { Component } from '@angular/core';
import { User } from '../models/user'
import { AuthServiceService } from '../auth-service.service';
import { UserServiceService } from '../user-service.service';
import { SearchComponent } from '../search/search.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MediaServiceService } from '../media-service.service';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterModule, RouterLink, UploadComponent, MatButtonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  user: User
  id: string
  friends: {}

  constructor(private authService: AuthServiceService, private userService: UserServiceService, private mediaService: MediaServiceService, private router: Router) {
    this.id = this.userService.fetchUsrID();
    this.user = userService.userObj();
    this.user.username = ''
    this.getUser()
  }

  getUser = async () =>{
    console.log(this.id)
    // if (this.id == null || this.id == '1'){
    //   console.log("No user logged in or cached...")
    //   this.router.navigate(['/'])
    // }
    return Promise.resolve(this.userService.fetchUsrByID(this.id).subscribe(data => {
      console.log('fetch by uid data: ' + data) 
      if (data != null && data != '1') {
        let data_user = data as User
        console.log(data_user)
        this.user = this.userService.parseUser(data_user)
        }
      }))
  }

  getUserMedia(uid) {
    console.log("Getting all user media...")
    
    // this.mediaService.getUserMedia(media_metadata)
  }

  purgeSession() {
    console.log("Purging user state data")
  }

  ngOnInit() {
    console.log('Component loaded...')
    console.log(this.id)
    if (this.id == null) {
      console.log("No user, returning to homepage")
      this.router.navigate(['/'])
    }
  } 
}



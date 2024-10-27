import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user'
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { UserServiceService } from '../user-service.service';
import { match } from 'assert';
import { stringify } from 'querystring';
import { log } from 'console';
import { Subscription, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private username: string;
  private password: string;
  private subscription: Subscription = new Subscription

  protected loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService:AuthServiceService, private userService: UserServiceService, private router: Router) {
  }

  onSubmit(){ 
    console.log('---Attempting to Log In')
    if(this.loginForm.valid){
      console.log('valid form')
      const username = this.loginForm.value['username']
      const password = this.loginForm.value['password']
      console.log(this.username)
      // console.log(this.user)
      this.authService.logIn(username, password).subscribe(data => {
        console.log(data)
        if (typeof data == 'string' && data != '1') {
            this.userService.saveUsrID(data)
            this.router.navigate(['/home'])
            console.log('this thing is still loaded for some reason...')
            return
        } else {
          console.log('access denied.')
          this.router.navigate(['/'])
          return
        }
      })
      // login.unsubscribe()
    } else {
      console.log('form invalid')
      console.log(this.loginForm)
    }    
  }
}

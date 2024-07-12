import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user'
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { match } from 'assert';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user:User;

  protected loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService:AuthServiceService, private router: Router) {
    this.user = new User
  }

  onSubmit(){ 
    console.log('---Attempting to Log In')
    if(this.loginForm.valid){
      console.log('valid form')
      this.user.username = this.loginForm.value['username']
      this.user.password = this.loginForm.value['password']
      console.log(this.user)

      this.authService.logIn(this.user).subscribe(data => {
        if (typeof data == 'string') {
          if (data != '1'){
            console.log('golden ticket')
            localStorage.setItem('id', data)
            this.router.navigate(['/home'])
          }else {
            console.log('access denied.')
            this.router.navigate(['/'])
          }
        }else {
          console.log('access denied.')
          this.router.navigate(['/'])
        }
      })
    } else {
      console.log('form invalid')
      console.log(this.loginForm)
    }
  }
}

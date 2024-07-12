import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user'
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { match } from 'assert';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user:User;

  protected signupForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService:AuthServiceService, private router: Router) {
    this.user = new User
    this.user.is_active = true
    this.user.is_admin = false
  }

  onSubmit(){ 
    console.log('---Registering new user')
    if(this.signupForm.valid){
      console.log('valid form')
      this.user.first_name = this.signupForm.value['first_name']
      this.user.last_name = this.signupForm.value['last_name']
      this.user.username = this.signupForm.value['username']
      this.user.password = this.signupForm.value['password']
      console.log(this.user)
      this.authService.signUp(this.user).subscribe(data => {
        if (data != null) {
          console.log('great success!')
          localStorage.setItem('username', this.user.username)
          this.router.navigate(['/home'])
        }
      })
    } else {
      console.log('form invalid')
      console.log(this.signupForm)
    }
  }
}

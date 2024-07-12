import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: '', component:LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: ProfilePageComponent },
    { path: 'signup', component:SignupComponent }
];

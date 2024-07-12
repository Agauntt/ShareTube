import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { LoginComponent } from './login/login.component';

// import { AppRoutingModule } from './app-routing.module'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, LandingComponent, 
    ProfilePageComponent, LoginComponent
    // AppRoutingModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular';
}

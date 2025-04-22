import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, // Checks authentication state
    private router: Router // Handles navigation
  ) {}

  // Determines if a route can be activated based on login state
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Allow access if the user is logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}

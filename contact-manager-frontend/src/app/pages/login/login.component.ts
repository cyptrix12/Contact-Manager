import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';



@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  isLoggedIn = false;
  email: string | null = null;
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {  
    if (this.authService.isLoggedIn()) {
      this.email = this.authService.getUserEmail();
    }
    this.refreshLoginState();
  }

  login() {
    if (!this.email || !this.password) {
      alert('Please provide login credentials.');
      return;
    }
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/contacts']);
      },
      error: err => {
        alert('Login failed.');
        console.error(err);
      }
    });
  }

  refreshLoginState(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.email = this.authService.getUserEmail();
  }

  logout() {
    this.authService.logout();
    this.email = null;
    this.router.navigate(['/login']);
    this.refreshLoginState();
  }
}

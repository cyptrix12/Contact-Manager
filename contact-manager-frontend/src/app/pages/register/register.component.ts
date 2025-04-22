import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup; // Reactive form for user registration

  constructor(
    private fb: FormBuilder, // FormBuilder for creating the form
    private authService: AuthService, // AuthService for handling registration
    private router: Router // Router for navigation
  ) {
    // Initialize the registration form with validation rules
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with required and email validators
      password: ['', [Validators.required, Validators.minLength(6)]] // Password field with required and min length validators
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.form.valid) {
      // Call the AuthService to register the user
      this.authService.register(this.form.value).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          console.error(err); 
          alert('Registration failed.'); 
        }
      });
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7243/api/Auth'; // Base API URL for authentication

  constructor(private http: HttpClient) {}

  // Log in a user and return a token
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  // Register a new user
  register(data: { email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Check if the user is logged in by verifying the presence of a token
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get the email of the logged-in user from the token
  getUserEmail(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ?? null;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  // Log out the user by removing the token from local storage
  logout() {
    localStorage.removeItem('token');
  }
}

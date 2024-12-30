import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;  // Flag to show loading state

  constructor(private http: HttpClient, private router: Router) {}

  onLoginSubmit() {
    this.isLoading = true;  // Set loading state to true
    const loginData = { email: this.email, password: this.password };
    console.log('Login data:', loginData);

    this.http.post('http://localhost:5000/login', loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        // Save token to localStorage or sessionStorage
        localStorage.setItem('token', response.token);
        // Redirect to the dashboard after a successful login
        setTimeout(() => {
          this.isLoading = false;  // Set loading state to false
          this.router.navigate(['/dashboard']);  // Redirect
        }, 1000);  // Optional: Add delay for smoother UX
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid login credentials.';
        this.isLoading = false;  // Set loading state to false on error
      }
    });
  }
}

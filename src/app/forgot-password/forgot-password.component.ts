import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Router, RouterModule } from '@angular/router';  // Import Router
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onForgotPasswordSubmit() {
    const emailData = { email: this.email };

    this.http.post('http://localhost:5000/forgot-password', emailData).subscribe({
      next: (response: any) => {
        console.log('Email exists for password reset', response);
        this.message = response.message;  // Show the success message
        localStorage.setItem('email', this.email);
        // Redirect to reset password page after email validation
        this.router.navigate(['/reset-password']);
      },
      error: (err) => {
        console.error('Error checking email:', err);
        this.message = 'No email found. Register now';
      }
    });
  }
}

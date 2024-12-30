import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [FormsModule, CommonModule] // Include FormsModule for form validation
})
export class ResetPasswordComponent {
  email: string = '';  // Email, possibly from URL or previous component
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      this.email = storedEmail; // Set the email field to the stored email
    }
  }

  onResetPasswordSubmit() {
    const resetData = {
      email: this.email,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    };

    // Ensure the passwords match
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    // Compare the email entered with the stored email
    const storedEmail = localStorage.getItem('email');
    if (storedEmail && this.email !== storedEmail) {
      this.message = 'The email does not match the email entered in the Forgot Password page.';
      return;
    }

    // Call the backend API to reset the password
    this.http.post('http://localhost:5000/reset-password', resetData).subscribe({
      next: (response: any) => {
        console.log('Password reset successful:', response);
        this.message = response.message; // Show the success message

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err: any) => {
        if (err.error?.message === 'New password cannot be the same as the old password') {
          this.message = 'New password cannot be the same as the old password. Please choose a different password.';
        } else {
          console.error('Error resetting password:', err);
          this.message = 'Error resetting password.';
        }
      },
    });
  }
}

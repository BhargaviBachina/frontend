import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router for navigation
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phoneNumber: string = '';
  gender: string = '';
  dob: string = '';

  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;  // Track loading state

  constructor(private http: HttpClient, private router: Router) {}  // Inject Router

  onSubmit() {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validate email
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Invalid email address.';
      return;
    }

    // Validate password
    if (!this.validatePassword(this.password)) {
      this.errorMessage =
        'Password must be at least 8 characters long and include both letters and numbers.';
      return;
    }

    // Validate phone number
    if (!this.validatePhoneNumber(this.phoneNumber)) {
      this.errorMessage = 'Phone number must be 10 digits.';
      return;
    }

    // Ensure passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const registrationData = {
      username: this.username,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      gender: this.gender,
      dob: this.dob
    };

    // Set loading to true
    this.isLoading = true;

    this.http.post('http://localhost:5000/register', registrationData).subscribe({
      next: () => {
        // Simulate a delay (e.g., 1 second) before displaying success message and redirecting
        setTimeout(() => {
          this.successMessage = 'Registration successful. Redirecting to login page...';
          this.errorMessage = '';
          // Redirect to login page after 3 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);  // Redirect after 3 seconds
        }, 1000); // Simulate 1 second loading time
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = 'Failed to register. Please try again.';
        this.isLoading = false;
      }
    });
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    // Updated regex: requires at least 8 characters, including letters, numbers, and at least one special character.
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  }

  private validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\d{10}$/; // Exactly 10 digits
    return phoneRegex.test(phoneNumber);
  }
}

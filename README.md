# User Authentication and Management Frontend

This project is a frontend application built with Angular, providing a user interface for authentication-related features such as registration, login, dashboard, forgot password, and reset password.

## Features

- **Registration**: Users can sign up by providing their username, email, password, phone number, gender, and date of birth.
- **Login**: Users can log in with their email and password.
- **Dashboard**: After successful login, users are redirected to a dashboard page.
- **Forgot Password**: Users can request a password reset by providing their email address.
- **Reset Password**: After verifying the email, users can reset their password.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (LTS version) 
- **Angular CLI** - Install Angular CLI globally using the following command:
  
  ```bash
  npm install -g @angular/cli

## Running the Application

To run the Angular frontend locally, follow these steps:

1. Open a terminal and navigate to your project directory.

2. Install the necessary dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   ng serve
4. This will start the application on **http://localhost:4200** by default.

## Components

### 1. Dashboard Component
- Displays user-specific information once the user is logged in.
- Redirects the user to login if they are not authenticated.
### 2. Forgot Password Component
- Allows users to submit their email address for password recovery.
- Sends a request to the backend to verify the email and then directs the user to the reset password page.
### 3. Login Component
- Handles user login functionality by submitting email and password to the backend.
- On success, stores the authentication token in local storage and redirects the user to the dashboard.
### 4. Register Component
- Registers a new user by submitting their username, email, password, and other personal details.
- Validates the provided input fields like email, password, and phone number.
Redirects to the login page after successful registration.
### 5. Reset Password Component
- Allows users to reset their password after they have forgotten it.
- Requires the user to enter the same email as in the forgot password step and new password details.
- Validates that the new password matches the confirmation password.

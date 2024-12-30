import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    
    // If there is no token, redirect to login page
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // If token exists, grant access to the route
    return true;
  }
}

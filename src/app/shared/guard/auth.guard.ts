import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      if (state.url === '/dashboard') {
        const userEmail = this.authService.getCurrentUserEmail(); // Get the current user's email
        this.authService.navigateBasedOnUserRole(userEmail); // Pass the email to navigateBasedOnUserRole
      }
      return true; // Allow navigation
    } else {
      // Not authenticated, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}

import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (await this.authService.isLoggedIn()) {
      const userEmail = await this.authService.getCurrentUserEmail();
      if (userEmail) {
        if (this.authService.isAdmin(userEmail)) {
          // Admin user, navigate to admin dashboard
          this.router.navigate(['/admin-dashboard']);
          return false; // Prevent further navigation
        } else {
          // Regular user, allow navigation to regular user dashboard
          return true;
        }
      } else {
        // Handle case where current user's email is null
        console.error('User email is null.');
        return false; // Prevent further navigation
      }
    } else {
      // Not authenticated, redirect to login page
      this.router.navigate(['/login']);
      return false; // Prevent further navigation
    }
  }
}

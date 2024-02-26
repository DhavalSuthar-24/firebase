import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
 if(!this.authService.isLoggedIn()){
   this.router.navigate(['/login']);
 }
  }



  ntologin(): void {
    this.router.navigate(['/login']);
  }

  ntofpage(): void {
    this.router.navigate(['/forget-password']);
  }

  async sup(email: string, password: string): Promise<void> {
    await this.authService.SignUp(email, password);
  }
}

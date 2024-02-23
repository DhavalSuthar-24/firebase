import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Route,Router } from '@angular/router';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    public authService: AuthService ,private router:Router
  ) { }
  ngOnInit() {
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
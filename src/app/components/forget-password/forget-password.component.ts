import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  constructor(
    public authService: AuthService, private r:Router
  ) { }
  ngOnInit() {
  }
  ntologin(){
    this.r.navigate(['/login'])
      }
}
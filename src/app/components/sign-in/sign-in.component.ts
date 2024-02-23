import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
 constructor(
  public authService:AuthService ,private r:Router
 ){}
 ngOnInit(): void {
   
 }

navigatetosignup(){
  this.r.navigate(['/sign-up']);
}

ntofpage(){
  this.r.navigate(['/forget-password'])
}



}

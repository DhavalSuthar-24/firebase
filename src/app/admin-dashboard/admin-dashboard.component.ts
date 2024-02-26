import { Component,OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

// userform:FormGroup;
userEmails:string[]=[]
constructor(public aservice:AuthService ,private r:Router){
  }
 ngOnInit():void{
 this.getuseremails()
 if(!this.aservice.isLoggedIn()){
  this.r.navigate(['/login']);

 
}
 }
 getuseremails() {
  this.aservice.getAlluser().subscribe(emails => {
    this.userEmails = emails;
  });
}

  deleteUser(email:string){
    this.aservice.deleteByEmail(email).then(()=>{
      this.getuseremails()
    })
  } 

   
 
}




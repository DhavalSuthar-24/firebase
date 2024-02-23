import { Component,OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

// userform:FormGroup;
userEmails:string[]=[]
constructor(public aservice:AuthService ){
  }
 ngOnInit():void{
 this.getuseremails()
 }
 getuseremails(){
   this.aservice.getAlluser().then(emails=>{
    this.userEmails =emails;
   })
   }
  deleteUser(email:string){
    this.aservice.deletebyEmail(email).then(()=>{
      this.getuseremails()
    })
  } 

   
 
}




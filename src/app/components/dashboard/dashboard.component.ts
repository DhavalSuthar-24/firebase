import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { DataService } from '../../shared/services/data.service';
import { Student } from '../../model/student';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  studentForm: FormGroup;
  studentList: Student[] = [];
  userCollectionName: string | undefined;
  formvisible:boolean;

  constructor(public authService: AuthService, private r:Router,private ds: DataService, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.userCollectionName = this.authService.userCollectionName;
    
    this.studentForm = this.fb.group({
      task: ['', Validators.required],
      desc: ['', Validators.required],
      mobile: ['', Validators.required]
    });

    if (this.userCollectionName) {
      this.getAllStudents();
    } else {
      console.error('User collection name not found.');
    }
    if(!this.authService.isLoggedIn()){
      this.r.navigate(['/login']);


  }
  }
  resetForm(): void {
    this.studentForm.reset();
    this.studentForm.markAsPristine();
    this.studentForm.markAsUntouched();
  }

  getAllStudents(): void {
    this.ds.getAlldocument(this.userCollectionName!).subscribe(
      (data: any) => {
        this.studentList = data.map((e: any) => {
          const data = e.payload.doc.data();
          const id = e.payload.doc.id;
          return { id, ...data } as Student;
        }).filter((student: Student) => !!student);
      },
      (err: any) => {
        console.error("Error while fetching data: ", err);
      }
    );
  }

  addStudent(): void {
    if (this.studentForm.invalid) {
      alert("Please fill all the fields correctly");
      return;
    }
  
    const newStudent: Student = {
      name: this.studentForm.get('task').value,
      desc: this.studentForm.get('desc').value,
      mobile: this.studentForm.get('mobile').value
    };
  
    this.ds.addDocument(this.userCollectionName!, newStudent).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      this.resetForm();
    }).catch((error) => {
      console.error("Error adding student: ", error);
      alert("Error adding student. Please try again.");
    });
  }
  

  deleteStudent(student: Student): void {
    if (!student.id) {
      console.error('Invalid student ID');
      return;
    }
  
    if (window.confirm('Are you sure you want to delete ' + student.name)) {
      this.ds.deleteDecument(this.userCollectionName!, student.id);
    }
  }
  toggleform(){
    this.formvisible=!this.formvisible;
    this.resetForm();
  }
  
}

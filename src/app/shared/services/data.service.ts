import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../../model/student';// Assuming Student type is defined

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) {}

  // addStudent(student: Student) {
  //   // student.id = this.afs.createId();
  //   return this.afs.collection('Students').doc(student.id).set(student);
  // }

  // getAllStudents() {
  //   return this.afs.collection('Students').snapshotChanges();
  // }

  // deleteStudent(student: Student) {
  //   if (!student || !student.id) {
  //     console.error('Invalid student or missing ID');
  //     return;
  //   }
  
  //   const docRef = this.afs.collection('Students').doc(student.id);
  
  //   // Delete the document asynchronously
  //   docRef.delete().then(() => {
  //     console.log('Document successfully deleted');
  //   }).catch(error => {
  //     console.error('Error deleting document:', error);
  //   });
  // }
  
  

  // updateStudent(student: Student) {
  //   const studentId = student.id;
  //   return this.afs.collection('Students').doc(studentId).update(student);
  // }
  addDocument(collectionName:string,data:any){
    return this.afs.collection(collectionName).add(data)
  } 
 deleteDecument(collectionName:string,documentId:string){
  const docRef = this.afs.collection(collectionName).doc(documentId)
  return docRef.delete()
 }
  updateDocument(collectionName:string,documentId:string,data:any){
    const docRef= this.afs.collection(collectionName).doc(documentId)
    return docRef.update(data)
  }
 getAlldocument(collectionName:string){
  return this.afs.collection(collectionName).snapshotChanges();
 }


}

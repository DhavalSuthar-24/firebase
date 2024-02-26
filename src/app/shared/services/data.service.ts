import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../../model/student';// Assuming Student type is defined

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) {}

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

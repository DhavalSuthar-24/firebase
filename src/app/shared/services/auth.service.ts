import { QuerySnapshot,QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

import { GoogleAuthProvider } from '@angular/fire/auth';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  adminEmails: string[] = ['dhavalll63@gmail.com', 'dhaval00033@gmail.com'];
ucname:string='';
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    // private authservice :AuthService
  ) {}
  userCollectionName: string | undefined;
  isAdmin(email: string): boolean {
    return this.adminEmails.includes(email);
  }

  async SignUp(email: string, password: string): Promise<void> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.SendVerificationMail();

      // Get collection name based on user email
      const emailPrefix = email.substring(0, 5);
      const collectionName = await this.createCollection(emailPrefix);

      this.userCollectionName = collectionName;

      this.router.navigate(['/verify-email']);
    } catch (error) {
      window.alert (error);
    }
  }

  async createCollection(collectionName: string): Promise<string> {
    try {
      const collectionRef = this.afs.collection(collectionName);
      await collectionRef.doc('placeholder').set({ created_at: new Date() });
      return collectionName;
    } catch (error) {
      throw error;
    }
  }

  getUserCollectionName(): string | undefined {
    return this.userCollectionName;
  }

 
  // auth.service.ts

  private isLoggedInFlag = false;

  // Other AuthService methods...

  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
    } else {
      // Handle the case where localStorage is not available
      return false; // Or implement your own logic for handling this case
    }
  }
  


   
  async SendVerificationMail() {
    try {
      const user = await this.afAuth.currentUser;
      if (user && user.email && !user.emailVerified) {
        await user.sendEmailVerification();
        this.router.navigate(['verify-email']);
      } else if (user && user.email && user.emailVerified) {
        console.log('Email is already verified.');
      } else {
        console.log('No user found or email not available.');
      }

      if (user && user.email) {
        await this.saveuserEmail(user.email);
      }
    } catch (error) {
      console.log('Error sending verification email:', error);
    }
  }

  async saveuserEmail(email: string) {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const userid = user.uid;
        await this.afs.collection('AdminUser').doc(userid).set({ email });
        console.log('User email saved to Firestore');
      } else {
        console.log('User not available');
      }
    } catch (error) {
      console.error('Error saving user email to Firestore:', error);
    }
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          const userEmail = result.user.email || '';
          this.navigateBasedOnUserRole(userEmail);
  
          // Set the user collection name after determining the user's role
          if (this.isAdmin(userEmail)) {
            // Set the admin collection name if user is admin
            this.userCollectionName = 'AdminUser'; // Update this with your admin collection name
          } else {
            // Set the regular user collection name if user is not admin
            const emailPrefix = userEmail.substring(0, 5);
            this.userCollectionName = emailPrefix;
          }
  
          // Set flag indicating user is logged in
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          console.log('No user found.');
        }
      })
      .catch((error) => {
        // Show error in alert
        window.alert(error.message);
      });
  }
  
  
  

  async SignUpWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await this.afAuth.signInWithPopup(provider);

      if (result.user) {
        const userEmail = result.user.email || '';
        this.navigateBasedOnUserRole(userEmail);
      } else {
        console.log('No user found.');
      }
    } catch (error) {
      console.error('Error during Google sign-up:', error);
    }
  }

  navigateBasedOnUserRole(userEmail: string) {
    if (this.isAdmin(userEmail)) {
      this.router.navigate(['admin-dashboard']);
    } else {
      this.router.navigate(['dashboard']);
    }
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

 getCurrentUserEmail(): string | null {
    const user = this.afAuth.currentUser;
    return user ?  user.email : null;
  }
  async getAlluser() {
    try {
      const snapshot: QuerySnapshot<any> | undefined = await this.afs.collection('AdminUser').get().toPromise();
      if (snapshot) {
        return snapshot.docs.map(doc => doc.data().email);
      } else {
        console.error('Error: Snapshot is undefined.');
        return [];
      }
    } catch (error) {
      console.error('Error retrieving user emails:', error);
      return [];
    }
  }
  
  async deletebyEmail(email: string) {
    try {
      const snapshot = await this.afs.collection('AdminUser', ref => ref.where('email', '==', email)).get().toPromise();
      if (snapshot) {
        snapshot.forEach(doc => doc.ref.delete());
        console.log(`User with email ${email} deleted successfully`);
      } else {
        console.error('Error: Snapshot is undefined.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}
  
  




import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  adminEmails: string[] = ['dhavalll63@gmail.com', 'dhaval00033@gmail.com'];
  userCollectionName: string | undefined;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {}

  isAdmin(email: string): boolean {
    return this.adminEmails.includes(email);
  }

  async SignUp(email: string, password: string): Promise<void> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const emailPrefix = email.substring(0, 5);
      await this.createCollection(emailPrefix);
      // Call SendVerificationMail after user creation
      await this.SendVerificationMail();
    } catch (error) {
      window.alert(error);
    }
  }
  
  async SendVerificationMail() {
    try {
      const user = await this.afAuth.currentUser;
      if (user && user.email && !user.emailVerified) {
        await user.sendEmailVerification();
        console.log('Verification email sent.');
        // Navigate to verify-email page
        this.router.navigate(['/verify-email']); 
        await this.saveuserEmail(user.email);
      } else if (user && user.email && user.emailVerified) {
        console.log('Email is already verified.');
      } else {
        console.log('No user found or email not available.');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
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
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          const userEmail = result.user.email || '';
          this.navigateBasedOnUserRole(userEmail);
          this.userCollectionName = this.isAdmin(userEmail) ? 'AdminUser' : userEmail.substring(0, 5);
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          console.log('No user found.');
        }
      })
      .catch((error) => {
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
        if (this.isAdmin(userEmail)) {
         // Save the user's email to the AdminUser collection
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
          await this.saveuserEmail(userEmail); 
        }
      } else {
        console.log('No user found.');
      }
    } catch (error) {
      console.error('Error during Google sign-up:', error);
    }
  }
  async ForgotPassword(passwordResetEmail: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

  navigateBasedOnUserRole(userEmail: string) {
    this.router.navigate(this.isAdmin(userEmail) ? ['admin-dashboard'] : ['dashboard']);
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  async deleteByEmail(email: string) {
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

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  getAlluser(): Observable<string[]> {
    return this.afs.collection('AdminUser').get().pipe(
      map((snapshot: QuerySnapshot<any>) => snapshot.docs.map((doc: any) => doc.data().email))
    );
  }

  private async createCollection(collectionName: string): Promise<string> {
    try {
      const collectionRef = this.afs.collection(collectionName);
      await collectionRef.doc('placeholder').set({ created_at: new Date() });
      return collectionName;
    } catch (error) {
      throw error;
    }
  }
}

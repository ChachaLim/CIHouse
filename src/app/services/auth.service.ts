import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(private AFauth: AngularFireAuth) { }

  login() {
    this.AFauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then( x => {
      console.log(x);
    });
  }

  logout() {
    this.AFauth.auth.signOut().then( x => {
      console.log(x);
    });
  }

  getCurrentUser() {
    return this.AFauth.authState;
  }

}

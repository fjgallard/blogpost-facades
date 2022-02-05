import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject(undefined);
  constructor(private auth: AngularFireAuth) {
    this.auth.onAuthStateChanged((user: any) => {
      this.$user.next(user);
    });
  }

}

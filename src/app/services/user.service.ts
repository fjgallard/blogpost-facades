import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface User {
  id: string;
  name: string;
  friends: Friend[];
}

export interface Friend {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  all() {
    return this.firestore.collection<User>('users').valueChanges();
  }

  find(id: string) {
    return this.firestore.doc<User>(`users/${id}`).valueChanges();
  }

  update(user: User) {
    return this.firestore.doc<User>(`users/${user.id}`).update(user);
  }

  delete(id: string) {
    return this.firestore.doc<User>(`users/${id}`).delete();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

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

  async getDetails(userId: string) {
    const { id, name } = await this.find(userId).pipe(take(1)).toPromise();
    return { id, name };
  }
}

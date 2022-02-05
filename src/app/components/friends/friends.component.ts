import { Component } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Friend, User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {

  $userId = new BehaviorSubject<string>(undefined);

  user: User;
  friends: Friend[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.$user.subscribe(user => {
      if (!user) {
        return;
      }

      this.$userId.next(user?.id);
    });

    this.$userId.pipe(switchMap(id => this.userService.find(id)))
      .subscribe(user => {
        this.user = user;
        this.friends = user.friends;
      });
  }

  async addFriend(userId: string) {
    const friend = await this.userService.getDetails(userId);

    this.user.friends.push(friend);
    this.userService.update(this.user);
  }

  async removeFriend(id: string) {
    const index = this.user.friends.findIndex(friend => friend.id === id);
    this.user.friends.splice(index, 1);
    this.userService.update(this.user);
  }

}

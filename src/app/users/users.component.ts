import { Component, OnInit } from '@angular/core';
import {User} from './user.model';
import {UsersService} from './users.service';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: User[];
  currentUser: User;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.usersService.getUsers().subscribe(usersList => {
        this.users$ = usersList;
      },
      err => console.log(err),
      () => console.log('Getting users OK...')
      );
  }
  getUser(user) {
    this.currentUser = user;
  }
}

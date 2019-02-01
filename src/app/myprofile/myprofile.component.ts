import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Events} from '../event-maneg/events/events.model';
import {User} from '../users/user.model';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  currentUsers: User;


  constructor(private auth: AuthenticationService) {}

  ngOnInit() {

  }
  getUser(user) {
    this.currentUsers = user;
  }

}

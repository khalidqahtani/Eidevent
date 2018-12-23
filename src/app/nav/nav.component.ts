import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  admin  = false;
  user  = false;
  org  = false;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.getRole();
  }
  getRole() {
    if (this.auth.getRole().includes('ROLE_ADMIN')) {
      return this.admin = true;
    }if (this.auth.getRole().includes('ROLE_USER')) {
      return this.user = true;
    }if (this.auth.getRole().includes('ROLE_ORGANIZER')) {
      return this.org = true;
    }
  }
}

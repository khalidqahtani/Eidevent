import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-nav-details',
  templateUrl: './nav-details.component.html',
  styleUrls: ['./nav-details.component.scss']
})
export class NavDetailsComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-event-maneg',
  templateUrl: './event-maneg.component.html',
  styleUrls: ['./event-maneg.component.scss']
})
export class EventManegComponent implements OnInit {
  admin  = false;
  user  = false;
  org  = false;
  private sub: Subscription;
  userid: number;
  constructor(private route: ActivatedRoute, private auth: AuthenticationService) { }
  ngOnInit() {
    this.userid = this.auth.getUserId();
    this.getRole();
  }
  getRole() {
    if (this.auth.getRole().includes('ROLE_ADMIN')) {
      return this.admin = true;
    }if (this.auth.getRole().includes('ROLE_USER')) {
      return this.user = true;
    }if (this.auth.getRole().includes('ROLE_ORG')) {
      return this.org = true;
    }
  }

}

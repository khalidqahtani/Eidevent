import {Component, Input, OnInit} from '@angular/core';
import {User} from './user.model';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from './users.service';

@Component({
  selector: 'app-user-detail',
  template: `
  <div *ngIf="user">
    <h2>User details</h2>
    <ul class="list-group">
      <li class="list-group-item">Email: {{ user.email }}</li>
      <li class="list-group-item">Gender: {{ user.gender }}</li>
      <li class="list-group-item">Phone: {{ user.mobile }}</li>
      <li class="list-group-item">Date of birth: {{ user.birthday }}</li>
      <td>
        <button [routerLink]="['/user', user.userid]" class="btn btn-primary" style="margin-top: 10px">Edit</button>
      </td>
    </ul>
  </div>
	`
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  userid: number;
  // currentUser$: Observable<User>;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      this.userid = params.userid;
    });
    console.log('userid is ?', this.userid);

  }
}

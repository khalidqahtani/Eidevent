import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../events.service';
import {UsersService} from '../../../../users/users.service';
import {Events} from '../../events.model';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {User} from '../../../../users/user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-orgnizerevents',
  templateUrl: './orgnizerevents.component.html',
  styleUrls: ['./orgnizerevents.component.scss']
})
export class OrgnizereventsComponent implements OnInit {
  orgid: number;
  events$: Events[];
  userid: number;
  attender = this.auth.getUserId()
  user: User;
  hide = true;
  pic: string;

  constructor(private ev: EventsService,
              private auth: AuthenticationService,
              private route: ActivatedRoute,
              private userService: UsersService,
              private eventService: EventsService,
              private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.userid = value.id;
      console.log(this.attender);
    });
    this.orgid = this.auth.getUserId();
    this.Myevents();
    this.getUser();

  }

  getUser(){
    this.userService.getUser(this.userid).subscribe(user => {
        this.user = user;
      },
      err => console.log(err),
      () => console.log('Getting users OK...')
    );
  }

  Myevents() {
    this.ev.Myevents(this.userid).subscribe(Myevent => {
        this.events$ = Myevent;
      },
      err => console.log(err),
      () => console.log('Getting users OK...')
    );
  }
  BookEvent(eventid: number) {
    this.eventService.BookEvent(eventid, this.attender).subscribe(eventbook => {
      },
      err => console.log(err),
      () => this.router.navigate(['/myticket']));

  }

}

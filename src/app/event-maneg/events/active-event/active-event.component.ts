import { Component, OnInit } from '@angular/core';
import {Events} from '../events.model';
import {EventsService} from '../events.service';
import {User} from '../../../users/user.model';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Router} from '@angular/router';
import {Comments} from '../../comment-maneg/comments.model';




@Component({
  selector: 'app-active-event',
  templateUrl: './active-event.component.html',
  styleUrls: ['./active-event.component.scss'],

})
export class ActiveEventComponent implements OnInit {

  events$: Events[];
  eventid: number;
  comments: Comments[];
  currentComments: Comments[];
  currentEvents: Events;
  userid = this.auth.getUserId();
  currentUser: User;
  term: string;

  constructor(private eventsService: EventsService,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.getEventApprove();
  }
  getEventApprove() {
    this.eventsService.getEventApprove().subscribe(eventApprovel => {
        this.events$ = eventApprovel;
      },
      err => console.log(err),
      () => console.log('Getting users OK...')
    );
  }
  getEvent(event) {
    this.currentEvents = event;
  }
  BookEvent(eventid: number) {
    this.eventsService.BookEvent(eventid, this.userid).subscribe(eventbook => {
      },
      err => console.log(err),
      () => this.router.navigate(['/myticket']));

  }
  getComent(comment, id) {
    console.log(comment);
    this.currentComments = comment;
    this.eventid = id;
  }
}

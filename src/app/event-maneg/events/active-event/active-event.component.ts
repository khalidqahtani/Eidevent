import {Component, OnInit} from '@angular/core';
import {Events} from '../events.model';
import {EventsService} from '../events.service';
import {User} from '../../../users/user.model';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Router} from '@angular/router';
import {Comments} from '../../comment-maneg/comments.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CommentService} from '../../comment-maneg/comment.service';
import {Ticketmodel} from '../../ticket-maneg/tickets.model';


@Component({
  selector: 'app-active-event',
  templateUrl: './active-event.component.html',
  styleUrls: ['./active-event.component.scss'],

})
export class ActiveEventComponent implements OnInit {

  events$: Events[];
  trending$: Events[];
  ticketbooked: Ticketmodel;
  eventid: number;
  comments: Comments[];
  currentComments: Comments[];
  currentEvents: Events;
  userid = this.auth.getUserId();
  currentUser: User;
  term;
  gend: string;
  public searchText : string;
  error;
  p = 1;


  constructor(private eventsService: EventsService,
              private auth: AuthenticationService,
              private router: Router
              ) {
  }

  ngOnInit() {
    this.getEventApprove();
    this.trending();


  }

  getEventApprove() {
    this.eventsService.getEventApprove().subscribe(eventApprovel => {
        this.events$ = eventApprovel;

        console.log(this.eventsService.getEvents())


      },
      err => console.log(err),
    );
  }

  trending() {
    this.eventsService.trending().subscribe(top3 => {
        this.trending$ = top3;
      },
      err => console.log(err),
    );
  }

  getEvent(event) {
    this.currentEvents = event;
  }

  BookEvent(eventid: number) {
    this.eventsService.BookEvent(eventid, this.userid).subscribe(eventbook => {
      },
      err => this.error=err,
      () => this.router.navigate(['/myticket']));

  }


  getComent(comment, id) {
    console.log(comment);
    this.currentComments = comment;
    this.eventid = id;
  }



  tybeSelect(type) {
    if (type.checked) {
      this.term = type.value;
    } else {
      this.term = null;
    }
  }

  gendSelect(type1) {
    if (type1.checked) {
      this.gend = type1.value;
    } else {
      this.gend = null;
    }
  }

  eventBooked() {
    if (this.ticketbooked.ticketbook != true){ return true}
  }


}

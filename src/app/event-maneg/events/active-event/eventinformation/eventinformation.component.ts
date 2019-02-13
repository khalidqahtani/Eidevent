import { Component, OnInit } from '@angular/core';
import {Events} from '../../events.model';
import {Comments} from '../../../comment-maneg/comments.model';
import {EventsService} from '../../events.service';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CommentService} from '../../../comment-maneg/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../users/user.model';
import {TicketService} from '../../../ticket-maneg/ticket.service';

@Component({
  selector: 'app-eventinformation',
  templateUrl: './eventinformation.component.html',
  styleUrls: ['./eventinformation.component.scss']
})
export class EventinformationComponent implements OnInit {

  events: Events;
  eventid: number;
  userid = this.auth.getUserId();
  comments: Comments[];
  commentForm: FormGroup;
  rateAvg;
  listNumer: number[] = [];


  constructor(private eventsService: EventsService,
              private auth: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private tikcetService: TicketService,
              private commentService: CommentService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.route.params.subscribe((param: any) => {
      this.eventid = param.id;
    });
    // this.orgfirst = this.currentEvents.OrgnizerID.firstname
    this.getEvents();

    this.commentForm = this.formBuilder.group({
      comment: [''],
    });
    this.commentforevent();

  }

  getEvents() {
    this.eventsService.getEvent(this.eventid).subscribe(events => {
        this.events = events;
        this.getRate(events.orgnizerID.userid);
      },
      err => console.log(err),
      () => console.log(this.events.orgnizerID.userid)
    );
  }

  getRate(id) {
    this.tikcetService.getRate(id).subscribe(value => {
      this.rateAvg = value;
      for (let i = 1; i <= this.rateAvg; i++) {
        this.listNumer.push(i);
      }
    });
  }

  // getEvent(event) {
  //   this.currentEvents = event;
  // }
  BookEvent() {
    this.eventsService.BookEvent(this.eventid, this.userid).subscribe(eventbook => {
      },
      err => console.log(err),
      () => this.router.navigate(['/myticket']));

  }

  fullBook() {
    if (this.events.capacity === this.events.counter) {
      return true;
    }
  }


  commentforevent() {
    this.eventsService.commentforevent(this.eventid).subscribe(comment => {
        this.comments = comment;
      },
      err => console.log(err),
    );

  }

  sendComment() {
    this.eventsService.CommentEvent(this.commentForm, this.eventid, this.auth.getUserId()).subscribe(value => this.ngOnInit());
    // console.log('The comment is : ', this.eventid);
  }

}





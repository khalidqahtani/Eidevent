import { Component, OnInit } from '@angular/core';
import {Events} from '../../events.model';
import {Comments} from '../../../comment-maneg/comments.model';
import {EventsService} from '../../events.service';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CommentService} from '../../../comment-maneg/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-eventinformation',
  templateUrl: './eventinformation.component.html',
  styleUrls: ['./eventinformation.component.scss']
})
export class EventinformationComponent implements OnInit {

  events: Events;
  eventid: number;
  evid: number;
  userid = this.auth.getUserId();
  comments: Comments[];
  currentComments: Comments[];
  currentEvents: Events;
  private sub: Subscription;
  commentForm: FormGroup;




  constructor(private eventsService: EventsService,
              private auth: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private commentService: CommentService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe((param: any) => {
      this.eventid = param.id;
    });

    console.log(this.evid);
    this.getEvents();
    this.commentForm = this.formBuilder.group({
      comment: [''],
    });
    this.commentforevent()
  }
  getEvents() {
    this.eventsService.getEvent(this.eventid).subscribe(events => {
        this.events = events;
      },
      err => console.log(err),
      () => console.log('jjjjjjj')
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
  fullBook() {
    if (this.currentEvents.capacity === this.currentEvents.counter) {
      return true;
    }
  }

  getComent(comment, id) {
    console.log(comment);
    this.currentComments = comment;
    this.eventid = id;
  }

  commentforevent() {
    this.eventsService.commentforevent(this.eventid).subscribe(comment => {
        this.comments = comment;
      },
      err => console.log(err),
    );

  }
  sendComment() {
    this.eventsService.CommentEvent(this.commentForm , this.eventid, this.auth.getUserId()).subscribe( value =>  this.ngOnInit());
    // console.log('The comment is : ', this.eventid);
  }

}

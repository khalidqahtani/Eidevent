import {Component, Input, OnInit} from '@angular/core';
import {Events} from './events.model';
import {ActivatedRoute} from '@angular/router';
import {EventsService} from './events.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Ticketmodel} from '../ticket-maneg/tickets.model';
import {CommentService} from '../comment-maneg/comment.service';
import {Comments} from '../comment-maneg/comments.model';

@Component({
  selector: 'app-event-detail',
  template: `
    <div *ngIf="event">
      <h2>Event details</h2>
      <ul class="list-group">
        <li class="list-group-item"> Tybe event: {{ event.tybeevent }}</li>
        <li class="list-group-item">Gender: {{ event.genderevent }}</li>
        <li class="list-group-item">Event street: {{ event.eventstreet }}</li>
        <li class="list-group-item">Event city: {{ event.eventcity }}</li>
        <li class="list-group-item">Event date: {{ event.eventdate }}</li>
        <li class="list-group-item">Event time: {{ event.eventtime }}</li>
        <li class="list-group-item">Capacity: {{ event.capacity }}</li>
        <li class="list-group-item">Counter: {{ event.counter }}</li>
        <li class="list-group-item">Deleted: {{ event.edelete }}</li>
        <li class="list-group-item">Approvel: {{ event.approval }}</li>
        <td>
          <button mat-raised-button color="accent" *ngIf="admin||org" [routerLink]="['/event', event.eventid]" class="btn btn-primary" style="margin-top: 10px">Edit</button>
          <button mat-raised-button color="primary" *ngIf="admin||org" [disabled]="eventdeleted()" (click)="deleteEvent(event.eventid)">Delete</button>
          <button mat-raised-button color="primary" *ngIf="admin||org" [disabled]="!eventdeleted()" (click)="undeleteEvent(event.eventid)">UnDelete</button>
          <button mat-raised-button color="primary" *ngIf="admin||org" [disabled]="eventapprovel()" (click)="approvelEvent(event.eventid)">approvel</button>
          <button mat-raised-button color="black" *ngIf="admin||org" [disabled]="!eventapprovel()" (click)="UnapprovelEvent(event.eventid)">Unapprovel</button>
          <button mat-raised-button color="black" *ngIf="user"  (click)="BookEvent(event.eventid)">Book</button>
          <button mat-raised-button color="primary" *ngIf="org||user" (click)="getComent(event.comments,event.eventid)">View Comment</button>
        </td>
      </ul>
      <app-comments-detils [eventid]="eventid" [comments]="currentComments"> </app-comments-detils>

    </div>
    `
})
export class EventDetailComponent implements OnInit {
  @Input() event: Events;
  ticket: Ticketmodel;
  eventid: number;
  userid = this.auth.getUserId();
  currentComments: Comments[];
  admin  = false;
  user  = false;
  org  = false;
  private sub: Subscription;
  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private commentService: CommentService,
              private auth: AuthenticationService) { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe((params: any) => {
    //   this.eventid = params.eventid;
    // });
    this.getRole();
  }
  deleteEvent(eventid: number) {
    this.eventsService.deleteEvent(eventid).subscribe(eventdelete => {
      },
      err => console.log(err),
      () => console.log('Event Deleted..')
    );
  }
  BookEvent(eventid: number) {
    this.eventsService.BookEvent(eventid, this.userid).subscribe(eventbook => {
      },
      err => console.log(err),
      () => console.log('Event Booking..')
    );
  }
  undeleteEvent(eventid: number) {
    this.eventsService.undeleteEvent(eventid).subscribe(eventUndelete => {
      },
      err => console.log(err),
      () => console.log('Event UnDeleted..')
    );
  }
  approvelEvent(eventid: number) {
    this.eventsService.approvelEvent(eventid).subscribe(approve => {
      },
      err => console.log(err),
      () => console.log('Approved..')
    );
  }
  UnapprovelEvent(eventid: number) {
    this.eventsService.UnapprovelEvent(eventid).subscribe(unapprove => {
      },
      err => console.log(err),
      () => console.log('UnApproved..')
    );
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
  eventapprovel() {
    if (this.event.approval === true) {return true;}
  }
  eventdeleted() {
    if (this.event.edelete === true) {return true;}
  }
  bookevent() {
    if (this.ticket.ticketbook === true) {return true}
  }
  comment(event) {
    this.commentService.Stream.next(event);
  }
  getCommentEvent(eventid: number) {
    this.commentService.getCommentEvent(eventid).subscribe(approve => {
      },
      err => console.log(err),
      () => console.log('event..')
    );
  }
  getComent(comment, id) {
    console.log(comment);
    this.currentComments = comment;
    this.eventid = id;
  }
}

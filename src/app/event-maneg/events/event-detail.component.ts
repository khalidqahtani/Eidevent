import {Component, Input, OnInit} from '@angular/core';
import {Events} from './events.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from './events.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Ticketmodel} from '../ticket-maneg/tickets.model';
import {CommentService} from '../comment-maneg/comment.service';
import {Comments} from '../comment-maneg/comments.model';

@Component({
  selector: 'app-event-detail',
  template: `
    <!--<div *ngIf="event">-->
      <!--<h2>Event details</h2>-->
      <!--<ul class="list-group">-->
        <!--<li class="list-group-item"> Tybe event: {{ event.tybeevent }}</li>-->
        <!--<li class="list-group-item">Gender: {{ event.genderevent }}</li>-->
        <!--<li class="list-group-item">Event street: {{ event.eventstreet }}</li>-->
        <!--<li class="list-group-item">Event city: {{ event.eventcity }}</li>-->
        <!--<li class="list-group-item">Event date: {{ event.eventdate }}</li>-->
        <!--<li class="list-group-item">Event time: {{ event.eventtime }}</li>-->
        <!--<li class="list-group-item">Capacity: {{ event.capacity }}</li>-->
        <!--<li class="list-group-item">Counter: {{ event.counter }}</li>-->
        <!--<li class="list-group-item">Deleted: {{ event.edelete }}</li>-->
        <!--<li class="list-group-item">Approvel: {{ event.approval }}</li>-->
        <!--<td>-->
          <!--<button mat-raised-button color="accent" *ngIf="admin||org" [routerLink]="['/event', event.eventid]" class="btn btn-primary" style="margin-top: 10px">Edit</button>-->
          <!--<button mat-raised-button color="primary" *ngIf="admin" [disabled]="eventdeleted()" (click)="deleteEvent(event.eventid)">Delete</button>-->
          <!--<button mat-raised-button color="primary" *ngIf="admin" [disabled]="!eventdeleted()" (click)="undeleteEvent(event.eventid)">UnDelete</button>-->
          <!--<button mat-raised-button color="primary" *ngIf="admin||org" [disabled]="eventapprovel()" (click)="approvelEvent(event.eventid)">approvel</button>-->
          <!--<button mat-raised-button color="black" *ngIf="admin||org" [disabled]="!eventapprovel()" (click)="UnapprovelEvent(event.eventid)">Unapprovel</button>-->
          <!--<button mat-raised-button color="black" *ngIf="user"  (click)="BookEvent(event.eventid)">Book</button>-->
          <!--<button mat-raised-button color="primary" *ngIf="org||user" (click)="getComent(event.comments,event.eventid)">View Comment</button>-->
          <!--<button mat-raised-button color="primary" *ngIf="org" [routerLink]="['/ticketsforevent/', event.eventid]" >View Ticket</button>-->
        <!--</td>-->
      <!--</ul>-->
      <!--<app-comments-detils [eventid]="eventid" [comments]="currentComments"> </app-comments-detils>-->

    <!--</div>-->



    

    <body class="hm-gradient">

    <main>

      <div class="row" *ngIf="event" >
        <div class="container mt-4">



          <div class="card mb-4">
            <div class="card-body">
              <table class="table table-hover">
                <thead class="mdb-color darken-3">
                <tr class="text-white" style="background-color: #241F61">
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>UnDelete</th>
                  <th>approvel</th>
                  <th>Unapprovel</th>
                  <th>View Comment</th>
                  <th>View Ticket</th>
                  <th>Book</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td><button mat-raised-button color="accent" *ngIf="admin||org" [routerLink]="['/event', event.eventid]" class="btn btn-primary" style="margin-top: 10px">Edit</button></td>
                  <td><button mat-raised-button color="primary" *ngIf="admin" [disabled]="eventdeleted()" (click)="deleteEvent(event.eventid)">Delete</button></td>
                  <td><button mat-raised-button color="primary" *ngIf="admin" [disabled]="!eventdeleted()" (click)="undeleteEvent(event.eventid)">UnDelete</button></td>
                  <td><button mat-raised-button color="primary" *ngIf="admin||org" [disabled]="eventapprovel()" (click)="approvelEvent(event.eventid)">approvel</button></td>
                  <td><button mat-raised-button color="black" *ngIf="admin||org" [disabled]="!eventapprovel()" (click)="UnapprovelEvent(event.eventid)">Unapprovel</button></td>
                  <td><button mat-raised-button color="primary" *ngIf="org||user" (click)="getComent(event.comments,event.eventid)">View Comment</button></td>
                  <td><button mat-raised-button color="primary" *ngIf="org" [routerLink]="['/ticketsforevent', event.eventid]" >View Ticket</button></td>
                  <td><button mat-raised-button color="black" *ngIf="user"  (click)="BookEvent(event.eventid)">Book</button></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>



        </div>
        <div class="col-md-7">
          <app-comments-detils [eventid]="eventid" [comments]="currentComments"> </app-comments-detils>
        </div>
      </div>
    </main>

    </body>


  `,
  styleUrls: ['./events.component.scss']

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
              private router: Router,
              private eventsService: EventsService,
              private commentService: CommentService,
              private auth: AuthenticationService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      this.eventid = params.eventid;
    });
    this.getRole();
  }
  deleteEvent(eventid: number) {
    this.eventsService.deleteEvent(eventid).subscribe(eventdelete => {
      },
      err => console.log(err),
      // () => console.log('Event Deleted..')
      () => this.router.navigate(['/myevent'])

  );
  }
  BookEvent(eventid: number) {
    this.eventsService.BookEvent(eventid, this.userid).subscribe(eventbook => {
      },
      err => console.log(err),
      () => this.router.navigate(['/myticket']));

  }
  undeleteEvent(eventid: number) {
    this.eventsService.undeleteEvent(eventid).subscribe(eventUndelete => {
      },
      err => console.log(err),
      () => this.router.navigate(['/myevent'])
    );
  }
  approvelEvent(eventid: number) {
    this.eventsService.approvelEvent(eventid).subscribe(approve => {
      },
      err => console.log(err),
      () => this.router.navigate(['/activeEvent'])
    );
  }
  UnapprovelEvent(eventid: number) {
    this.eventsService.UnapprovelEvent(eventid).subscribe(unapprove => {
      },
      err => console.log(err),
      () => this.router.navigate(['/activeEvent'])
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
      // ( => this.router.navigate(['/myevent']));
  }
  getCommentEvent(eventid: number) {
    this.commentService.getCommentEvent(eventid).subscribe(approve => {
      },
      err => console.log(err),
      () => console.log('event..')
    );
  }
  Myeventtickets(eid: number) {
    this.eventsService.Myeventtickets(eid).subscribe();
  }
  getComent(comment, id) {
    console.log(comment);
    this.currentComments = comment;
    this.eventid = id;
  }
}

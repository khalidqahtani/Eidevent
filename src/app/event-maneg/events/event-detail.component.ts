import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../users/user.model';
import {Events} from './events.model';
import {ActivatedRoute} from '@angular/router';
import {EventsService} from './events.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ActiveEventComponent} from './active-event/active-event.component';

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
          <button mat-raised-button color="accent" *ngIf="admin" [routerLink]="['/event', event.eventid]" class="btn btn-primary" style="margin-top: 10px">Edit</button>
          <button mat-raised-button color="primary" *ngIf="admin" [disabled]="eventdeleted()" (click)="deleteEvent(event.eventid)">Delete</button>
          <button mat-raised-button color="primary" *ngIf="admin" [disabled]="!eventdeleted()" (click)="undeleteEvent(event.eventid)">UnDelete</button>
          <button mat-raised-button color="primary" [disabled]="eventapprovel()" (click)="approvelEvent(event.eventid)">approvel</button>
          <button mat-raised-button color="black" [disabled]="!eventapprovel()" (click)="UnapprovelEvent(event.eventid)">Unapprovel</button>
        </td>
      </ul>
    </div>
    `
})
export class EventDetailComponent implements OnInit {
  @Input() event: Events;
  eventid: number;
  admin  = false;
  user  = false;
  org  = false;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private eventsService: EventsService, private auth: AuthenticationService,  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      this.eventid = params.eventid;
    });
    console.log('event id is:', this.eventid);
    this.getRole();
  }
  deleteEvent(eventid: number) {
    this.eventsService.deleteEvent(eventid).subscribe(eventdelete => {
      },
      err => console.log(err),
      () => console.log('Event Deleted..')
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
}

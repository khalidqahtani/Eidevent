import {Component, Input, OnInit} from '@angular/core';
import {Events} from '../events.model';
import {EventsService} from '../events.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tickets-for-events',
  templateUrl: './tickets-for-events.component.html',
})
export class TicketsForEventsComponent implements OnInit {
  events$: Events;
  currentEvents: Events;
  eventid: number;
  private sub: Subscription;

  constructor(private eventsService: EventsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      this.eventid = params.eventid;
    });
    this.Myeventtickets(this.eventid);
  }
  Myeventtickets(eid: number) {
    this.eventsService.Myeventtickets(eid).subscribe();
  }
  getEvent(event) {
    this.currentEvents = event;
  }

}

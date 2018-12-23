import { Component, OnInit } from '@angular/core';
import {Events} from './events.model';
import {EventsService} from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events$: Events[];
  currentEvents: Events;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.getEvents();
  }
  getEvents() {
    this.eventsService.getEvents().subscribe(eventList => {
      this.events$ = eventList;
    },
      err => console.log(err),
      () => console.log('Getting users OK...')
      );
  }
  getEvent(event) {
    this.currentEvents = event;
  }

}

import { Component, OnInit } from '@angular/core';
import {Events} from '../events.model';
import {EventsService} from '../events.service';

@Component({
  selector: 'app-unactive-event',
  templateUrl: './unactive-event.component.html',
  styleUrls: ['./unactive-event.component.scss']
})
export class UnactiveEventComponent implements OnInit {
  events$: Events[];
  currentEvents: Events;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.getEventUnAprove();
  }
  getEventUnAprove() {
    this.eventsService.getEventUnAprove().subscribe(eventUnApprovel => {
        this.events$ = eventUnApprovel;
      },
      err => console.log(err),
      () => console.log('list event unapproved...')
    );
  }
  getEvent(event) {
    this.currentEvents = event;
  }

}

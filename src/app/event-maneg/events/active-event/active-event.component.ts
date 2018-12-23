import { Component, OnInit } from '@angular/core';
import {Events} from '../events.model';
import {EventsService} from '../events.service';

@Component({
  selector: 'app-active-event',
  templateUrl: './active-event.component.html',
})
export class ActiveEventComponent implements OnInit {

  events$: Events[];
  currentEvents: Events;

  constructor(private eventsService: EventsService) { }

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

}

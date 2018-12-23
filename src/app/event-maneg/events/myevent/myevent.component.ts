import { Component, OnInit } from '@angular/core';
import {Events} from '../events.model';
import {EventsService} from '../events.service';
import {AuthenticationService} from '../../../authentication/authentication.service';

@Component({
  selector: 'app-myevent',
  templateUrl: './myevent.component.html',
  styleUrls: ['./myevent.component.scss']
})
export class MyeventComponent implements OnInit {
  events$: Events[];
  currentEvents: Events;
  orgid: number;

  constructor(private eventsService: EventsService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.orgid = this.auth.getUserId();
    this.Myevents();
  }
  Myevents() {
    this.eventsService.Myevents(this.orgid).subscribe(Myevent => {
        this.events$ = Myevent;
      },
      err => console.log(err),
      () => console.log('Getting users OK...')
    );
  }
  getEvent(event) {
    this.currentEvents = event;
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {EventsService} from '../event-maneg/events/events.service';
import {Events} from '../event-maneg/events/events.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit {
  events$: Events[];
  currentEvents: Events;

  constructor(private auth: AuthenticationService,
              private eventService: EventsService) { }

  ngOnInit() {
    this.Top3Events();
  }
  Top3Events() {
    this.eventService.First3Events().subscribe(top3 => {
        this.events$ = top3;
      },
      err => console.log(err),
    );
  }
  getEvent(event) {
    this.currentEvents = event;
  }

}

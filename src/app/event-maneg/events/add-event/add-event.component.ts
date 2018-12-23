import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '../events.service';
import {Events} from '../events.model';
import {AuthenticationService} from '../../../authentication/authentication.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
})
export class AddEventComponent implements OnInit {
  events$: Observable<Events>;
  myReactiveForm: FormGroup;
  orgid: number;

  constructor(private formBuilder: FormBuilder , private eventsService: EventsService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      eventid: ``,
      nameevent: ``,
      tybeevent: ``,
      genderevent: ``,
      eventstreet: ``,
      eventcity: ``,
      eventdate: ``,
      eventtime: ``,
      capacity: ``,
      counter: ``
    });
    this.orgid = this.auth.getUserId();
  }
  onSubmit() {
    this.eventsService.addEvent(this.orgid, this.myReactiveForm).subscribe();
  }

}

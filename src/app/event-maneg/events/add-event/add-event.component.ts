import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '../events.service';
import {Events} from '../events.model';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']

})
export class AddEventComponent implements OnInit {
  events$: Observable<Events>;
  myReactiveForm: FormGroup;
  orgid: number;
  error = '';


  constructor(private formBuilder: FormBuilder ,
              private eventsService: EventsService,
              private auth: AuthenticationService,
              private router: Router) { }

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
      description: ``,
      specialneed: ``,
      capacity: ``,
      counter: ``
    });
    this.orgid = this.auth.getUserId();
  }
  onSubmit() {
    this.eventsService.addEvent(this.orgid, this.myReactiveForm).subscribe(
      data => {
      },
      error => this.error = error,
      () => this.router.navigate(['/myevent']));
  }

}

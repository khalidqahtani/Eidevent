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
  events: Events;
  orgid: number;
  error = '';


  constructor(private formBuilder: FormBuilder ,
              private eventsService: EventsService,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      eventid:  ``,
      nameevent: ['', Validators.compose([Validators.required,
      Validators.pattern(/[a-zA-Z0-9]{3,15}/),
      Validators.maxLength(15),
      Validators.minLength(3),
      ])],
      tybeevent: ['', Validators.compose([Validators.required,
        Validators.pattern(/[a-zA-Z]{3,15}/),
        Validators.maxLength(15),
        Validators.minLength(3),
      ])],
      genderevent: ['', Validators.compose([Validators.required,
      Validators.pattern(/[^\s]+/),
      Validators.pattern(/[a-zA-Z]{3,9}/),
      Validators.maxLength(9),
      Validators.minLength(3),])],
      eventstreet: ['', Validators.compose([Validators.required,
      Validators.pattern(/[a-zA-Z0-9]{3,15}/),
      Validators.maxLength(15),
      Validators.minLength(3),])],
      eventcity: ['', Validators.compose([Validators.required,
      Validators.pattern(/[a-zA-Z\s]{3,15}/),
      Validators.maxLength(15),
      Validators.minLength(3),])],
      eventdate: ['', Validators.required],
      eventtime: ['', Validators.required],
      description: ['', Validators.compose([Validators.required,
      Validators.maxLength(48),
      Validators.minLength(3),])],
      specialneed: ['', Validators.required],
      capacity: ['', Validators.compose([Validators.required,
        Validators.maxLength(300),
        Validators.minLength(20),])],
      pic: [''],
      counter: ``,
    });
    this.orgid = this.auth.getUserId();
  }
  onSubmit() {
    this.eventsService.addEvent(this.orgid, this.myReactiveForm).subscribe(
      data => {
      }, (error) => console.log(error),
      () => this.router.navigate(['/myevent']));
  }

}

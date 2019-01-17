import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Events} from '../event-maneg/events/events.model';
import {EventsService} from '../event-maneg/events/events.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
})
export class EditEventComponent implements OnInit {
  myForm: FormGroup;
  id: number;
  events$: Events;

  constructor(private formBuilder: FormBuilder,
              private eventsService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthenticationService
              ) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.id = value.id;
    });

    this.eventsService.getEvent(this.id).subscribe((value0 => {
      this.events$ = value0;
      this.myForm.patchValue(this.events$ as any);
    }));
    console.log(this.auth.getUserId());
    this.myForm = this.formBuilder.group({
      eventid: ['', Validators.required],
      nameevent: ['', Validators.required],
      tybeevent: ['', Validators.required],
      genderevent: '',
      eventstreet: ['', Validators.required],
      eventcity: ['', Validators.required],
      eventdate: ``,
      eventtime: ``,
      capacity: ['', Validators.required],
      counter: ``,
      edelete: ``,
      approval: ``
    });
  }
  onSubmit() {
    this.eventsService.updateEvent(this.myForm, this.id).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error),
      () => this.router.navigate(['/myevent']));
  }
  deleteEvent() {
    this.eventsService.deleteEvent(this.id).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error),
      () => this.router.navigate(['/myevent']));
    console.log(`this event Id delted`, this.id );
  }

}

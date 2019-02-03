import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Events} from '../event-maneg/events/events.model';
import {EventsService} from '../event-maneg/events/events.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
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
        Validators.pattern(/[a-zA-Z]{3,15}/),
        Validators.maxLength(15),
        Validators.minLength(3),])],
      eventdate: [Validators.required],
      eventtime: [Validators.required],
      description: ['', Validators.compose([Validators.required,
        Validators.pattern(/[a-zA-Z0-9]{3,48}/),
        Validators.maxLength(48),
        Validators.minLength(3),])],
      specialneed: [Validators.required],
      capacity: ['', Validators.compose([Validators.required,
        Validators.maxLength(300),
        Validators.minLength(20),])],
      counter: ``
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

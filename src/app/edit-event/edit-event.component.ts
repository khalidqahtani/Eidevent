import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Events} from '../event-maneg/events/events.model';
import {EventsService} from '../event-maneg/events/events.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
})
export class EditEventComponent implements OnInit {
  myForm: FormGroup;
  eventid: number;
  events$: Events;
  constructor(private formBuilder: FormBuilder, private eventsService: EventsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.eventid = value.eventid;
    });
    console.log('user id is ? ', this.eventid);

    this.eventsService.getEvent(this.eventid).subscribe((value0 => {
      this.events$ = value0;
      this.myForm.patchValue(this.events$ as any);
    }));
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
    this.eventsService.updateEvent(this.myForm, this.eventid).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => {});
  }
  deleteEvent() {
    this.eventsService.deleteEvent(this.eventid).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => {});
    console.log(`this event Id delted`, this.eventid );
  }

}

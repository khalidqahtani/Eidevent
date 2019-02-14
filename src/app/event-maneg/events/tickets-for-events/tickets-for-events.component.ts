import {Component, Input, OnInit} from '@angular/core';
import {Events} from '../events.model';
import {EventsService} from '../events.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Ticketmodel} from '../../ticket-maneg/tickets.model';
import {UsersService} from '../../../users/users.service';
import {User} from '../../../users/user.model';
import {TicketService} from '../../ticket-maneg/ticket.service';
import {AuthenticationService} from '../../../authentication/authentication.service';

@Component({
  selector: 'app-tickets-for-events',
  templateUrl: './tickets-for-events.component.html',
  styleUrls: ['./tickets-for-events.component.scss']
})
export class TicketsForEventsComponent implements OnInit {
  ticket: Ticketmodel[];
  tickets: Ticketmodel;
  events$: Events;
  currentEvents: Events;
  // userid: number;
  id: number;
  event: Events;
  myForm;
  error;


  constructor(private eventsService: EventsService,
              private ticketService: TicketService,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit() {


    this.route.params.subscribe((params: any) => {
      this.id = params.id;

    });


    this.eventsService.getEvent(this.id).subscribe((value0 => {
      this.event = value0;


      if (this.event.orgnizerID.userid == this.auth.getUserId()){
        this.eventsService.Myeventtickets(this.id).subscribe((value0 => {
          this.ticket = value0;
        }), error1 => this.error = true);
      }


    }));



  }
  Myeventtickets() {
    this.eventsService.Myeventtickets(this.id).subscribe(Myevent => {
        this.ticket = Myevent;
      },
      err => console.log(err),
      () => console.log('ticketlist ok')
    );
  }
  getevent() {
    this.eventsService.getEvent(this.id).subscribe(Myevent => {
        this.currentEvents = Myevent;
      },
      err => console.log(err),
      () => console.log('Events it ok')
    );
  }
  presentTicket(id: number) {
    this.ticketService.presentTicket(id).subscribe(present => this.ngOnInit(),

      err => console.log(err),
    );
  }

  unpresentTicket(id: number) {
    this.ticketService.unpresentTicket(id).subscribe(unprsent => this.ngOnInit(),
      err => console.log(err),
    );
  }
  present(ticket: Ticketmodel) {
    if (ticket.userpresent === true) {return true; }
  }
}

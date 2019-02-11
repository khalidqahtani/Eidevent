import { Component, OnInit } from '@angular/core';
import {TicketService} from './ticket.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Ticketmodel} from './tickets.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ticket-maneg',
  templateUrl: './ticket-maneg.component.html',
  styleUrls: ['./ticket-maneg.component.scss']
})
export class TicketManegComponent implements OnInit {
  tikets$: Ticketmodel[];
  ticket: Ticketmodel;
  ticketid: number;
  currentTickets: Ticketmodel;
  userid: number;

  constructor(private ticketService: TicketService,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.userid = this.auth.getUserId();
    this.MyTickets();
  }
  MyTickets() {
    this.ticketService.MyTickets(this.userid).subscribe(myticket => {
        this.tikets$ = myticket;
      },
      err => console.log(err),
      () => console.log('list Ticket ...')
    );
  }
  getTicket(ticket) {
    this.currentTickets = ticket;
    // if (this.currentTickets.eid.nameevent)
  }
  deleteTicket(tid: number) {
    this.ticketService.deleteTicket(tid).subscribe(canselTicket => {
      },
      err => console.log(err),
      () => this.router.navigate(['/activeEvent'])
    );
  }

  sendRate(rate) {
    this.ticketService.rateEvent(this.ticketid , rate.value).subscribe();
    console.log(rate);
  }


}

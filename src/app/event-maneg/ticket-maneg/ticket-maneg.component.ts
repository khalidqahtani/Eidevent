import { Component, OnInit } from '@angular/core';
import {TicketService} from './ticket.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Ticketmodel} from './tickets.model';

@Component({
  selector: 'app-ticket-maneg',
  templateUrl: './ticket-maneg.component.html',
  styleUrls: ['./ticket-maneg.component.scss']
})
export class TicketManegComponent implements OnInit {
  tikets$: Ticketmodel[];
  currentTickets: Ticketmodel;
  userid: number;

  constructor(private ticketService: TicketService, private auth: AuthenticationService) { }

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


}

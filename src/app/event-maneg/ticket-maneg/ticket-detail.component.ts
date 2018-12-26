import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';
import {TicketService} from './ticket.service';
import {Ticketmodel} from './tickets.model';

@Component({
  selector: 'app-ticket-detail',
  template: `
    <div *ngIf="ticket">
      <h2>Ticket Detail</h2>
      <ul class="list-group">
        <li class="list-group-item"> Ticket ID: {{ ticket.ticketid }}</li>
        <li class="list-group-item">Date: {{ ticket.date }}</li>
        <li class="list-group-item">Ticket Cansel: {{ ticket.ticketcancel }}</li>
        <li class="list-group-item">Present : {{ ticket.userpresent }}</li>
        <li class="list-group-item">Event : {{ ticket.eventname }}</li>
        <li class="list-group-item">User: {{ ticket.dateevent }}</li>
        <td>
          <button mat-raised-button color="primary" *ngIf="user" [disabled]="(ticketdeleted())" (click)="deleteTicket(ticket.ticketid)">Cansel</button>
        </td>
      </ul>
    </div>
    `

})
export class TicketDetailComponent implements OnInit {
  @Input() ticket: Ticketmodel;
  eventid: number;
  userid: number;
  tid: number;
  admin  = false;
  user  = false;
  org  = false;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private ticketService: TicketService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      this.tid = params.tid;
    });
    console.log('ticket id is:', this.tid);
    this.getRole();
  }
  deleteTicket(tid: number) {
    this.ticketService.deleteTicket(tid).subscribe(canselTicket => {
      },
      err => console.log(err),
      () => console.log('Ticket Deleted..')
    );
  }
  getRole() {
    if (this.auth.getRole().includes('ROLE_ADMIN')) {
      return this.admin = true;
    }if (this.auth.getRole().includes('ROLE_USER')) {
      return this.user = true;
    }if (this.auth.getRole().includes('ROLE_ORG')) {
      return this.org = true;
    }
  }
  ticketdeleted() {
    if (this.ticket.ticketcancel === true) {return true;}
  }

}

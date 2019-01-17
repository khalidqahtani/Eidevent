import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';
import {TicketService} from './ticket.service';
import {Ticketmodel} from './tickets.model';
import {Rate} from './rate-maneg/rate.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ticket-detail',
  template: `
    <div *ngIf="ticket">
      <h2>Ticket Detail</h2>
      <ul class="list-group">
        <li class="list-group-item"> Ticket ID: {{ ticket.ticketid }}</li>
        <li class="list-group-item">Date: {{ ticket.date }}</li>
        <li class="list-group-item">Ticket Cansel: {{ ticket.ticketcancel }}</li>
        <li class="list-group-item">Ticket : {{ ticket.ticketbook }}</li>
        <li class="list-group-item">Present : {{ ticket.userpresent }}</li>
        <li class="list-group-item">Event : {{ ticket.eventname }}</li>
        <li class="list-group-item">Event Date: {{ ticket.dateevent }}</li>
        <li class="list-group-item">Rate Ticket {{ ticket.ticketrate }}</li>


        <td>
          <button mat-raised-button color="primary" *ngIf="user" [disabled]="(ticketdeleted())" (click)="deleteTicket(ticket.ticketid)">Cansel</button>
        </td>
      </ul>
      <div>
      <mat-form-field>
        <mat-select #rate placeholder="Rate Event" >
          <mat-option value="1">1</mat-option>
          <mat-option value="2">2</mat-option>
          <mat-option value="3">3</mat-option>
          <mat-option value="4">4</mat-option>
          <mat-option value="5">5</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-fab color="warn" (click)="sendRate(rate)" >Rate</button>
        
      </div>
    `

})
export class TicketDetailComponent implements OnInit {
  @Input() ticket: Ticketmodel;
  rate: Rate;
  eventid: number;
  // ticketid: number;
  userid: number;
  currentRates: Rate[];
  rateForm: FormGroup;
  tid: number;
  admin  = false;
  user  = false;
  org  = false;
  private sub: Subscription;

  constructor(private route: ActivatedRoute,
              private auth: AuthenticationService,
              private ticketService: TicketService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      this.tid = params.tid;
    });
    this.rateForm = this.formBuilder.group({
      attenderRate: ['', Validators.required],
    });
    this.getRole();
  }
  deleteTicket(tid: number) {
    this.ticketService.deleteTicket(tid).subscribe(canselTicket => {
      },
      err => console.log(err),
      () => this.router.navigate(['/activeEvent'])
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
    if (this.ticket.ticketcancel === true) {return true; }
  }
  sendRate(rate) {
    this.ticketService.rateEvent(this.ticket.ticketid , rate.value).subscribe();
    console.log(rate);
  }
  ticketrate() {
    if (this.rate.rated === true) {return true;}
  }

}

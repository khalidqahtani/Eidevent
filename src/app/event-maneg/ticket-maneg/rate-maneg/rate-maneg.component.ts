import { Component, OnInit } from '@angular/core';
import {Rate} from './rate.model';
import {AuthenticationService} from '../../../authentication/authentication.service';

@Component({
  selector: 'app-rate-maneg',
  templateUrl: './rate-maneg.component.html',
  styleUrls: ['./rate-maneg.component.scss']
})
export class RateManegComponent implements OnInit {
  rates$: Rate[];
  curentRate: Rate;
  userid: number;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.userid = this.auth.getUserId();
    this.MyRate();
  }
  MyRates() {
    this.ticketService.MyTickets(this.userid).subscribe(myticket => {
        this.tikets$ = myticket;
      },
      err => console.log(err),
      () => console.log('list Ticket ...')
    );
  }

}

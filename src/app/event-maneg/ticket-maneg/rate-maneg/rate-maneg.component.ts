import { Component, OnInit } from '@angular/core';
import {Rate} from './rate.model';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {RateService} from './rate.service';

@Component({
  selector: 'app-rate-maneg',
  templateUrl: './rate-maneg.component.html',
  styleUrls: ['./rate-maneg.component.scss']
})
export class RateManegComponent implements OnInit {
  rates$: Rate[];
  curentRate: Rate;
  userid: number;
  constructor(private auth: AuthenticationService, private rateService: RateService) { }

  ngOnInit() {
    this.userid = this.auth.getUserId();
    this.MyRates();
  }
  MyRates() {
    this.rateService.MyRates(this.userid).subscribe(myrates => {
        this.rates$ = myrates;
      },
      err => console.log(err),
      () => console.log('list rates ...')
    );
  }

}

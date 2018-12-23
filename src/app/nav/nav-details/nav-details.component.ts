import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-nav-details',
  templateUrl: './nav-details.component.html',
  styleUrls: ['./nav-details.component.scss']
})
export class NavDetailsComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}

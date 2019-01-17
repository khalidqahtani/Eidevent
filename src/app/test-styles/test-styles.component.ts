import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-test-styles',
  templateUrl: './test-styles.component.html',
  styleUrls: ['./test-styles.component.scss']
})
export class TestStylesComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}

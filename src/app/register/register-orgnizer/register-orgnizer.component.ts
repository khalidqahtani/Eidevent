import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../users/user.model';
import {UsersService} from '../../users/users.service';

@Component({
  selector: 'app-register-orgnizer',
  templateUrl: './register-orgnizer.component.html',
})
export class RegisterOrgnizerComponent implements OnInit {
  user$: Observable<User>;
  myReactiveForm: FormGroup;



  constructor(private formBuilder: FormBuilder , private userService: UsersService) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      id: ``,
      firstname: ``,
      lastname: ``,
      username: ``,
      password: ``,
      birthday: '',
      gender: ``,
      email: ``,
      mobile: ``
    });
  }
  onSubmit() {
    this.userService.addOrgnizer(this.myReactiveForm).subscribe();
  }
}

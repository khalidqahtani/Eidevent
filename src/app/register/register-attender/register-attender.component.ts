import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from '../../users/user.model';
import {UsersService} from '../../users/users.service';


@Component({
  selector: 'app-register-attender',
  templateUrl: './register-attender.component.html',
  styleUrls: ['./register-attender.component.scss']
})
export class RegisterAttenderComponent implements OnInit {
  users$: Observable<User>;
  myReactiveForm: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder , private userService: UsersService) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ``,
      password: ``,
      birthday: '',
      gender: ``,
      email: ``,
      mobile: ``
    });
  }onSubmit() {
    // this.userService.addUser(this.myReactiveForm).subscribe();
    console.log(this.myReactiveForm);
  }

}

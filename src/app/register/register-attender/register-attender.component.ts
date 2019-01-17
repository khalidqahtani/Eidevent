import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from '../../users/user.model';
import {UsersService} from '../../users/users.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register-attender',
  templateUrl: './register-attender.component.html',
  styleUrls: ['./register-attender.component.scss']
})
export class RegisterAttenderComponent implements OnInit {
  users$: Observable<User>;
  myReactiveForm: FormGroup;
  hide = true;
  error = '';


  constructor(private formBuilder: FormBuilder , private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required,
        Validators.pattern(/[^\\s]+/),
        Validators.pattern(/[1-2]{1}[0-9]{9}/),
        Validators.maxLength(10),
        Validators.minLength(10)])],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }onSubmit() {
    this.userService.addUser(this.myReactiveForm).subscribe(
      data => {
        // this.router.navigate(['/users"']);
      },
      error => this.error = error,
      () => this.router.navigate(['/login'])
    );
  }

}

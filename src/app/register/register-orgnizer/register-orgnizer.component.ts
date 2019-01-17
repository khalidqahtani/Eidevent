import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../users/user.model';
import {UsersService} from '../../users/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-orgnizer',
  templateUrl: './register-orgnizer.component.html',
  styleUrls: ['./register-orgnizer.component.scss']
})
export class RegisterOrgnizerComponent implements OnInit {
  user$: Observable<User>;
  myReactiveForm: FormGroup;
  hide = true;
  error = '';



  constructor(private formBuilder: FormBuilder , private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.myReactiveForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }
  onSubmit() {
    this.userService.addOrgnizer(this.myReactiveForm).subscribe(
      data => {
        // this.router.navigate(['/users"']);
      },
      error => this.error = error,
      () => this.router.navigate(['/login'])
    );
  }
}

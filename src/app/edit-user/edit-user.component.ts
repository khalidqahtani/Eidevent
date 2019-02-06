import { Component, OnInit } from '@angular/core';
import {User} from '../users/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../users/users.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']

})
export class EditUserComponent implements OnInit {
  myForm: FormGroup;
  userid: number;
  user$: User;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.userid = value.userid;
    });

    this.usersService.getUser(this.userid).subscribe((value0 => {
      this.user$ = value0;
      this.myForm.patchValue(this.user$ as any);
    }));

    this.myForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required,
        Validators.pattern(/[^\s]/),
        Validators.pattern(/[1-2]{1}[0-9]{9}/),
        Validators.maxLength(10),
        Validators.minLength(10)])],
      firstname: ['', Validators.compose([Validators.required,
        Validators.pattern(/[a-zA-Z]{2,10}/),
        Validators.maxLength(10),
        Validators.minLength(2)])],
      lastname: ['', Validators.compose([Validators.required,
        Validators.pattern(/[a-zA-Z]{2,16}/),
        Validators.maxLength(16),
        Validators.minLength(2)])],
      pic: [''],
      username: ['', Validators.compose([Validators.required,
        Validators.pattern(/[a-z0-9]{4,11}/),
        Validators.pattern(/[^\s]/),
        Validators.maxLength(11),
        Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[^\s]+/)])],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,
        Validators.pattern(/[^\s]/),
        Validators.maxLength(37),
        Validators.email])],
      mobile: ['', Validators.compose([Validators.required,
        Validators.pattern(/[^\s]+/),
        Validators.pattern(/[5]{1}[0-9]{8}/),
        Validators.maxLength(9),
        Validators.minLength(9)])]
    });
  }
  onSubmit() {
    this.usersService.updateUser(this.myForm, this.userid).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error),
      () => this.router.navigate(['/users'])
    );
  }
  deleteUser() {
    this.usersService.deleteUser(this.userid).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error),
      () => this.router.navigate(['/users'])
    );
  }

}

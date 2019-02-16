import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Events} from '../event-maneg/events/events.model';
import {User} from '../users/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../users/users.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  myForm: FormGroup;
  userid: number;
  user$: User;
  user: User;
  hide = true;
  pic: string;
  currentUsers: User;
  forbiden;
  error;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthenticationService) {}

  ngOnInit() {

    this.route.params.subscribe((value: any) => {
      this.userid = value.id;


    if (this.router.url.startsWith('/myprofile')) {
      if (this.userid != this.auth.getUserId()) {
        this.forbiden = true;
      }
    }
    });

    if (!this.forbiden){
      this.usersService.getUser(this.userid).subscribe((value0 => {
        this.user$ = value0;
        this.myForm.patchValue(this.user$ as any);
      }), error1 => this.error = true);
    };



    this.usersService.getUser(this.userid).subscribe((value0 => {
      this.user$ = value0;
      this.user$.password = '';
      this.myForm.patchValue(this.user$ as any);
      this.pic = this.user$.pic;


    }));


    this.myForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required,
        Validators.pattern(/[^\s]/),
        Validators.pattern(/[1-2]{1}[0-9]{9}/),
        Validators.maxLength(10),
        Validators.minLength(10)])],
      firstname: ['', Validators.compose([Validators.required,
        Validators.pattern(/[a-zA-Z\s]{2,10}/),
        Validators.maxLength(10),
        Validators.minLength(2)])],
      lastname: ['', Validators.compose([Validators.required,
        Validators.pattern(/[a-zA-Z\s]{2,16}/),
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

  getUser(user) {
    this.currentUsers = user;
  }

}

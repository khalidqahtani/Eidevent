import { Component, OnInit } from '@angular/core';
import {User} from './user.model';
import {UsersService} from './users.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {Therole} from '../role.model';
import {Ticketmodel} from '../event-maneg/ticket-maneg/tickets.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: User[];
  users: User[] = [];
  admins: User[] = [];
  organizers: User[] = [];
  currentUser: User;
  myForm: FormGroup;
  userid: number;

  // currentRole: Therole;
  constructor(private usersService: UsersService,
              private auth: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
    this.userid = value.userid;
  });

    this.usersService.getUser(this.userid).subscribe((value0 => {
      this.currentUser = value0;
      this.myForm.patchValue(this.currentUser as any);
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
    this.getUsers();
  }
  getUsers() {
    this.usersService.getUsers().subscribe(usersList => {
        this.users$ = usersList;
        this.users$.forEach( value => {
          if (value.roles.rolename.includes('ROLE_ADMIN')) {
            this.admins.push(value);
          }
          if (value.roles.rolename.includes('ROLE_USER')) {
            this.users.push(value);
          }
          if (value.roles.rolename.includes('ROLE_ORGANIZER')) {
            this.organizers.push(value);
          }
            });
      },
      err => console.log(err),
      () => console.log('Getting users OK...')
      );
  }
  getUser(user) {
    this.currentUser = user;
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
  pushUserToEdit(user) {
    // this.cUser = user;
    this.myForm.patchValue(user as any);

  }

}

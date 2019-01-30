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
  role: Therole;
  myForm: FormGroup;
  cUser: User;
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
      id: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: '',
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z]/)])],
      mobile: ``,
      gender: ``,
      birthday: ``
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

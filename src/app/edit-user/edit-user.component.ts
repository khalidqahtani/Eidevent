import { Component, OnInit } from '@angular/core';
import {User} from '../users/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../users/users.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
  myForm: FormGroup;
  userid: number;
  user$: User;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.userid = value.userid;
    });
    console.log('user id is ? ', this.userid);

    this.usersService.getUser(this.userid).subscribe((value0 => {
      this.user$ = value0;
      this.myForm.patchValue(this.user$ as any);
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
  }
  onSubmit() {
    this.usersService.updateUser(this.myForm, this.userid).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => {});
  }
  deleteUser() {
    this.usersService.deleteUser(this.userid).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => {});
    console.log(`this user Id delted`, this.userid );
  }

}

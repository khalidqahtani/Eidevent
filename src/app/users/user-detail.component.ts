import {Component, Input, OnInit} from '@angular/core';
import {User} from './user.model';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from './users.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  styleUrls: ['./users.component.scss'],
  template: `
  <div *ngIf="user">
    <!--<h2>User details</h2>-->
    <!--<ul class="list-group">-->
      <!--<li class="list-group-item">Email: {{ auth.getEmail() }}</li>-->
      <!--<li class="list-group-item">Gender: {{ user.gender }}</li>-->
      <!--<li class="list-group-item">Phone: {{ user.mobile }}</li>-->
      <!--<li class="list-group-item">Date of birth: {{ user.birthday }}</li>-->
      <!--<td>-->
        <!--<button [routerLink]="['/user', user.userid]" class="btn btn-primary" style="margin-top: 10px">Edit</button>-->
      <!--</td>-->
    <!--</ul>-->
    <div class="container">
      <div class="row" *ngIf="user">
        <div class="col-lg-12 col-sm-6 ">

          <div class="card hovercard">
            <div class="cardheader">

            </div>
            <div class="avatar">
              <img  src="assets/male-user (1).png">
            </div>
            <div class="info">
              <div class="title">
                <form novalidate [formGroup]="myForm" (ngSubmit)="onSubmit()">

                  <mat-form-field appearance="outline">
                    <mat-label>Id</mat-label>
                    <input matInput type="text" formControlName="id" placeholder="ID">
                    <mat-icon matSuffix>assignment</mat-icon>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Email address</mat-label>
                    <input matInput type="text" formControlName="email" placeholder="Email">
                    <mat-icon matSuffix>assignment</mat-icon>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>First Name</mat-label>
                    <input matInput type="text" formControlName="firstname" placeholder="firstname">
                    <mat-icon matSuffix>assignment</mat-icon>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Last Name</mat-label>
                    <input matInput type="text" formControlName="lastname" placeholder="Last Name">
                    <mat-icon matSuffix>assignment</mat-icon>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Mobile</mat-label>
                    <input matInput type="text" formControlName="mobile" placeholder="Mobile">
                    <!--<mat-error *ngIf="myReactiveForm.controls.id.invalid&&myReactiveForm.touched.id">Plese Help</mat-error>-->
                    <mat-icon matSuffix>assignment</mat-icon>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Event Gender</mat-label>
                    <mat-select placeholder="Gender" formControlName="gender" >
                      <mat-option value="Male">Male</mat-option>
                      <mat-option value="Female">Female</mat-option>
                    </mat-select>
                    <mat-icon matSuffix>people</mat-icon>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Date</mat-label>
                    <input matInput [matDatepicker]="picker" placeholder="Choose a date" formControlName="birthday">
                    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker touchUi #picker></mat-datepicker>
                  </mat-form-field>

                  <button type="submit" class="btn btn-primary"
                          (click)="onSubmit()" style="margin-right: 10px">Submit</button>

                  
                </form>

            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
	`

})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  userid: number;
  currentUser: User;

  // currentUser$: Observable<User>;
  private sub: Subscription;
  myForm: FormGroup;


  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private auth: AuthenticationService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: any) => {
      this.userid = params.userid;
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
    console.log('userid is ?', this.auth.getUserId());

  }
  onSubmit() {
    this.usersService.updateUser(this.myForm, this.auth.getUserId()).subscribe(res => {
        if (res !== null && res !== undefined) {
          console.log(res);
        }
      }, (error) => console.log(error),
      // () => this.router.navigate(['/home'])
    );
  }
}

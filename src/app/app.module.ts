import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { EventsComponent } from './event-maneg/events/events.component';
import {HttpClientModule} from '@angular/common/http';
import {UserDetailComponent} from './users/user-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EventDetailComponent } from './event-maneg/events/event-detail.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import {RegisterOrgnizerComponent} from './register/register-orgnizer/register-orgnizer.component';
import {RegisterAttenderComponent} from './register/register-attender/register-attender.component';
import { EventManegComponent } from './event-maneg/event-maneg.component';
import { AddEventComponent } from './event-maneg/events/add-event/add-event.component';
import { ActiveEventComponent } from './event-maneg/events/active-event/active-event.component';
import { NavDetailsComponent } from './nav/nav-details/nav-details.component';
import { MyeventComponent } from './event-maneg/events/myevent/myevent.component';
import { UnactiveEventComponent } from './event-maneg/events/unactive-event/unactive-event.component';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    RegisterOrgnizerComponent,
    RegisterAttenderComponent,
    UsersComponent,
    UserDetailComponent,
    EventsComponent,
    EditUserComponent,
    EventDetailComponent,
    EditEventComponent,
    EventManegComponent,
    AddEventComponent,
    ActiveEventComponent,
    NavDetailsComponent,
    MyeventComponent,
    UnactiveEventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
